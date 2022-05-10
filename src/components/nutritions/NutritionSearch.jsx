import {
  OutlinedInput,
  Autocomplete,
  ButtonGroup,
  Button,
  Box,
  IconButton,
  Paper,
  InputBase,
  FilledInput,
  TextField,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useContext, useState, useRef } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturnRounded'
import { fetchNutritions } from '../../context/calorieninja/CalorieNinjaActions'
import SidebarContext from '../../context/sidebar/SidebarContext'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import { setDailyIntakes, getDailyIntakes, getIntakes, getIntakesHistory } from '../../context/caloriefydb/CaloriefyDbActions'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddCircleRounded } from '@mui/icons-material'
import Tables from '../layout/Tables'

function NutritionSearch(props) {
  const { value, setSidebar } = useContext(SidebarContext)
  const { caloriefyDbDispatch, intakesList, intakesHistory, user } = useContext(CaloriefyDbContext)
  const [nutritions, setNutritions] = useState([{}])
  const searchText = useRef(null)
  const manualName = useRef(null)
  const manualCalories = useRef(null)
  const manualServSize = useRef(null)
  const manualFats = useRef(null)
  const manualCarbs = useRef(null)
  const manualProteins = useRef(null)
  const [calorieNinjaLoading, setCalorieNinjaLoading] = useState(false)
  const [disableButton, setDisableButton] = useState(true)

  const postNutritions = async (e) => {
    e.preventDefault()

    if (
      nutritions[0].name === '' ||
      !nutritions[0].name ||
      nutritions[0].calories === '' ||
      nutritions[0].calories === 0 ||
      !nutritions[0].calories
    ) {
      toast.warning('Missing name or calories!')
    } else {
      nutritions.forEach((nut) => {
        nut.performed_at = value
      })

      // SET NUTRITIONS TO DB
      const set_response = await setDailyIntakes(nutritions)
      if (set_response.status !== 200) {
        return toast.error(set_response.message || set_response || `Internal server error!`)
      }

      manualName.current && (manualName.current.value = '')
      manualCalories.current && (manualCalories.current.value = '')
      manualServSize.current && (manualServSize.current.value = '')
      manualFats.current && (manualFats.current.value = '')
      manualCarbs.current && (manualCarbs.current.value = '')
      manualProteins.current && (manualProteins.current.value = '')
      setDisableButton(false)

      // CLEAR NUTRITIONS FROM UI TABLE
      setNutritions([{}])

      // GET NUTRITIONS FROM DB (TO GET WHOLE DAY DATA)
      const get_response = await getDailyIntakes(value)
      if (get_response.status !== 200) {
        return toast.error(get_response.message || get_response || `Internal server error!`)
      }

      // SET NUTRITIONS TO SIDEBAR
      caloriefyDbDispatch({ type: 'SET_DAILY_INTAKES', payload: get_response.data })
      setSidebar(true)
    }
  }

  const discardClick = () => {
    manualName.current && (manualName.current.value = '')
    manualCalories.current && (manualCalories.current.value = '')
    manualServSize.current && (manualServSize.current.value = '')
    manualFats.current && (manualFats.current.value = '')
    manualCarbs.current && (manualCarbs.current.value = '')
    manualProteins.current && (manualProteins.current.value = '')
    setDisableButton(false)

    setNutritions([{}])
  }

  const updateCustomNuts = (e, nut) => {
    if (Object.values(nut)[0] === '' && nutritions[0]) {
      //handle if one of the inputs are empty
      let a = nutritions[0]
      delete a[Object.keys(nut)[0]]
      return setNutritions([a])
    }

    switch (Object.keys(nut)[0]) {
      case 'name':
        //enable buttons if some value has been added
        e.target.value.length === 0 ? setDisableButton(true) : setDisableButton(false)
        return (
          nutritions[0][Object.keys(nut)[0]] !== Object.values(nut)[0] && setNutritions([{ ...nutritions[0], name: Object.values(nut)[0] }])
        )
      case 'calories':
        //enable buttons if some value has been added
        e.target.value.length === 0 ? setDisableButton(true) : setDisableButton(false)
        return (
          nutritions[0][Object.keys(nut)[0]] !== parseInt(Object.values(nut)[0]) &&
          setNutritions([{ ...nutritions[0], calories: parseInt(Object.values(nut)[0]) }])
        )
      case 'serving_size_g':
        return (
          nutritions[0][Object.keys(nut)[0]] !== parseInt(Object.values(nut)[0]) &&
          setNutritions([{ ...nutritions[0], serving_size_g: parseInt(Object.values(nut)[0]) }])
        )
      case 'fat_total_g':
        return (
          nutritions[0][Object.keys(nut)[0]] !== parseInt(Object.values(nut)[0]) &&
          setNutritions([{ ...nutritions[0], fat_total_g: parseInt(Object.values(nut)[0]) }])
        )
      case 'carbohydrates_total_g':
        return (
          nutritions[0][Object.keys(nut)[0]] !== parseInt(Object.values(nut)[0]) &&
          setNutritions([{ ...nutritions[0], carbohydrates_total_g: parseInt(Object.values(nut)[0]) }])
        )
      case 'protein_g':
        return (
          nutritions[0][Object.keys(nut)[0]] !== parseInt(Object.values(nut)[0]) &&
          setNutritions([{ ...nutritions[0], protein_g: parseInt(Object.values(nut)[0]) }])
        )
      default:
        return
    }
  }

  /*
  const handleChange = (e) => {
     UNNECESSARY AFTER STATE TO REF REFACTOR
    //enable buttons if some value has been added
    e.target.value.length === 0 ? setDisableButton(true) : setDisableButton(false)

    let { id, value } = e.target
    switch (id) {
      case 'serving_size_g':
        return setManualServSize(value)
      case 'fat_total_g':
        return setManualFats(value)
      case 'calories':
        return setManualCalories(value)
      case 'carbohydrates_total_g':
        return setManualCarbs(value)
      case 'protein_g':
        return setManualProteins(value)
      default:
        break
    }
  }*/

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchClick(e)
    }
  }

  const handleSearchClick = async (e) => {
    e.preventDefault()
    /* GET SEARCHINPUT ELEMENT */
    const searchInput = searchText.current.childNodes[0]

    if (searchInput.value === '') {
      toast.warning('Please enter something!')
    } else {
      /* SET BUTTONS AND LOADING */
      setDisableButton(false)
      setCalorieNinjaLoading(true)

      /* GET NUTRITIONS */
      const nuts = await fetchNutritions(searchInput.value)
      if (nuts.length === 0) {
        toast.warning('Did not find any result!')
      }

      /* SET NUTRITION RESPONSE TO TABLE */
      setNutritions(nuts)

      /* RESET SEARCHINPUT */
      setCalorieNinjaLoading(false)
    }
  }

  /*useEffect(() => {
    caloriefyDbDispatch({ type: 'SET_LOADING' })
    // GET NUTRITIONS FROM DB (TO GET WHOLE DAY DATA)
    const getCons = async () => {
      const response = await getIntakes()
      caloriefyDbDispatch({type: 'SET_INTAKES', payload: response})
    }

    getCons()
  }, [caloriefyDbDispatch])*/

  const openCaloriefyListTab = async () => {
    // GET ALL INTAKES FROM DB
    const response = await getIntakes()

    if (response.status !== 200) {
      return toast.error(response.message || response || `Internal server error!`)
    } else {
      caloriefyDbDispatch({ type: 'SET_INTAKES', payload: response.data })
    }
  }

  const openCaloriefyHistoryTab = async () => {
    // GET ACTIVITY HISTORY FROM DB

    const response = await getIntakesHistory()

    if (response.status !== 200) {
      return toast.error(response.message || response || `Internal server error!`)
    } else {
      caloriefyDbDispatch({ type: 'SET_INTAKES_HISTORY', payload: response.data })
    }
  }

  return (
    <div style={{ width: '105.9%', marginLeft: '-23px' }}>
      {console.log('Nutrition search render')}
      {props.tab === 'searchTab' && (
        <Paper
          component='form'
          sx={{
            display: 'flex',
            height: '55px',
            backgroundColor: 'primary.dark',
            '&:hover': {
              opacity: [0.9],
            },
          }}
          variant='elevation'
        >
          <InputBase
            id='searchText'
            sx={{ ml: 1, flex: 1, color: 'primary.light' }}
            placeholder='eg.: 200g chicken breast and 300g veggie rice'
            ref={searchText}
            onKeyPress={(e) => {
              handleEnter(e)
            }}
            type='text'
          />
          <IconButton color='primary' sx={{ p: '10px', color: 'primary.light' }} aria-label='directions' onClick={handleSearchClick}>
            <KeyboardReturnIcon />
          </IconButton>
        </Paper>
      )}

      {props.tab === 'listTab' && (
        <>
          <Autocomplete
            options={intakesList
              .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
              .filter(function (item, pos, ary) {
                return !pos || item.name !== ary[pos - 1].name
              })}
            onOpen={openCaloriefyListTab}
            clearOnEscape={true}
            onChange={(e, value) => {
              //set nutritions
              if (value) {
                setNutritions([value])
                setDisableButton(false)
                manualName.current.focus()
                value.name && (manualName.current.value = value.name)
                value.calories && (manualCalories.current.value = value.calories)
                value.carbohydrates_total_g && (manualCarbs.current.value = value.carbohydrates_total_g)
                value.fat_total_g && (manualFats.current.value = value.fat_total_g)
                value.protein_g && (manualProteins.current.value = value.protein_g)
                value.serving_size_g && (manualServSize.current.value = value.serving_size_g)
              }
            }} // prints the selected value
            getOptionLabel={function (option) {
              return option.name + ' | ' + option.calories + ' calories'
            }}
            sx={{ width: '100%', pb: 2 }}
            PaperComponent={({ children }) => (
              <Paper sx={{ backgroundColor: 'primary.dark', color: 'primary.light', borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                {children}
              </Paper>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ backgroundColor: 'primary.light', borderTopRightRadius: 3, borderTopLeftRadius: 3 }}
                variant='filled'
                fullWidth
                label='Select from Caloriefy list'
                placeholder='Foods and drinks'
              />
            )}
          />

          <Autocomplete
            options={intakesHistory
              .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
              .filter(function (item, pos, ary) {
                return !pos || item.name !== ary[pos - 1].name
              })}
            onOpen={openCaloriefyHistoryTab}
            clearOnEscape={true}
            disabled={user === null ? true : false}
            onChange={(e, value) => {
              //set nutritions
              if (value) {
                setNutritions([value])
                setDisableButton(false)
                manualName.current.focus()
                value.name && (manualName.current.value = value.name)
                value.calories && (manualCalories.current.value = value.calories)
                value.carbohydrates_total_g && (manualCarbs.current.value = value.carbohydrates_total_g)
                value.fat_total_g && (manualFats.current.value = value.fat_total_g)
                value.protein_g && (manualProteins.current.value = value.protein_g)
                value.serving_size_g && (manualServSize.current.value = value.serving_size_g)
              }
            }} // prints the selected value
            getOptionLabel={function (option) {
              return option.name + ' | ' + option.calories + ' calories'
            }}
            sx={{ width: '100%', pb: 2 }}
            PaperComponent={({ children }) => (
              <Paper sx={{ backgroundColor: 'primary.dark', color: 'primary.light', borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                {children}
              </Paper>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ backgroundColor: 'primary.light', borderTopRightRadius: 3, borderTopLeftRadius: 3 }}
                variant='filled'
                fullWidth
                label='Or select from your Intake History'
                placeholder='Foods and drinks'
              />
            )}
          />

          <Box>
            <FilledInput
              id='name'
              inputRef={manualName}
              sx={{ mb: 2 }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                maxLength: 30,
              }}
              required
              fullWidth
              type='text'
              placeholder='Add new food or drink*'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Name *</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { name: e.currentTarget.value })}
            />
            <FilledInput
              id='serving_size_g'
              inputRef={manualServSize}
              sx={{ mb: 2, mr: '1%', width: '49%' }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                max: 9999,
              }}
              variant='filled'
              placeholder='Add new intake serving size (g)'
              type='number'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Serving size (g)</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { serving_size_g: e.currentTarget.value })}
            />
            <FilledInput
              id='calories'
              inputRef={manualCalories}
              sx={{ mb: 2, ml: '1%', width: '49%' }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                max: 9999,
              }}
              required
              variant='filled'
              placeholder='Add new intake calories'
              type='number'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Calories *</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { calories: e.currentTarget.value })}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <OutlinedInput
              id='fat_total_g'
              inputRef={manualFats}
              sx={{ mb: 2, flex: 1 }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                max: 9999,
              }}
              variant='outlined'
              type='number'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Fat (g)</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { fat_total_g: e.currentTarget.value })}
            />
            <OutlinedInput
              id='carbohydrates_total_g'
              inputRef={manualCarbs}
              sx={{ mb: 2, ml: 1, flex: 1 }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                max: 9999,
              }}
              variant='outlined'
              type='number'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Carbs (g)</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { carbohydrates_total_g: e.currentTarget.value })}
            />
            <OutlinedInput
              id='protein_g'
              inputRef={manualProteins}
              sx={{ mb: 2, ml: 1, flex: 1 }}
              inputProps={{
                style: { paddingTop: '24px', paddingBottom: '8px' },
                max: 9999,
              }}
              variant='outlined'
              type='number'
              startAdornment={
                <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Protein (g)</Typography>
              }
              onBlur={(e) => updateCustomNuts(e, { protein_g: e.currentTarget.value })}
            />
          </Box>
        </>
      )}

      {console.log('NutritionSearchRender1')}
      {console.log(nutritions)}

      {calorieNinjaLoading && <h1>Loading..</h1>}

      {nutritions[0].name && !calorieNinjaLoading && (
        <>
          {console.log('NutritionSearchRender2')}
          {console.log(nutritions)}

          <Tables id='nutritionTable' items={nutritions} />

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <ButtonGroup variant='contained' aria-label='outlined primary button group'>
              <Button color='cons' startIcon={<AddCircleRounded />} disabled={disableButton} onClick={postNutritions}>
                Add
              </Button>
              <Button color='burn' endIcon={<DeleteIcon />} disabled={disableButton} onClick={discardClick}>
                Discard
              </Button>
            </ButtonGroup>
          </Box>
        </>
      )}
    </div>
  )
}

export default NutritionSearch
