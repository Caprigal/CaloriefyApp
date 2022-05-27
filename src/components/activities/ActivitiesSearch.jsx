import { OutlinedInput, Autocomplete, ButtonGroup, Button, Box, Paper, FilledInput, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useContext, useState, useRef } from 'react'
import SidebarContext from '../../context/sidebar/SidebarContext'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import { setDailyActivities, getDailyActivities, getActivities, getActivityHistory } from '../../context/caloriefydb/CaloriefyDbActions'
import DeleteIcon from '@mui/icons-material/Delete'
import { AddCircleRounded } from '@mui/icons-material'
import Tables from '../layout/Tables'

function ActivitiesSearch() {
  const { value, setSidebar } = useContext(SidebarContext)
  const { caloriefyDbDispatch, activityList, activityHistory, user } = useContext(CaloriefyDbContext)
  const [activities, setActivities] = useState([{}])
  const activityName = useRef(null)
  const activityCalories = useRef(null)
  const activityLength = useRef(null)
  const activityTime = useRef(null)
  const [activitiesListLoader, setActivitiesListLoader] = useState(false)
  const [activitiesHistoryLoader, setActivitiesHistoryLoader] = useState(false)
  const [disableButton, setDisableButton] = useState(true)

  const postActivities = async (e) => {
    e.preventDefault()

    if (
      activities[0].name === '' ||
      !activities[0].name ||
      activities[0].calories === '' ||
      activities[0].calories === 0 ||
      !activities[0].calories
    ) {
      toast.warning('Missing name or calories!')
    } else {
      // SET ACTIVITIES TO DB
      const set_response = await setDailyActivities([{ ...activities[0], performed_at: value }])
      if (set_response.status !== 200) {
        return toast.error(set_response.message || set_response || `Internal server error!`)
      }

      activityName.current && (activityName.current.value = '')
      activityCalories.current && (activityCalories.current.value = '')
      activityLength.current && (activityLength.current.value = '')
      activityTime.current && (activityTime.current.value = '')
      setDisableButton(false)

      // CLEAR ACTIVITIES FROM UI TABLE
      setActivities([{}])

      // GET ACTIVITIES FROM DB (TO GET WHOLE DAY DATA)
      const get_response = await getDailyActivities(value)
      if (get_response.status !== 200) {
        return toast.error(get_response.message || get_response || `Internal server error!`)
      }

      // SET ACTIVITIES TO SIDEBAR
      caloriefyDbDispatch({ type: 'SET_DAILY_ACTIVITIES', payload: get_response.data })
      setSidebar(true)
    }
  }

  const discardClick = () => {
    activityName.current && (activityName.current.value = '')
    activityCalories.current && (activityCalories.current.value = '')
    activityLength.current && (activityLength.current.value = '')
    activityTime.current && (activityTime.current.value = '')
    setDisableButton(false)

    setActivities([{}])
  }

  const updateCustomActs = (e, act) => {
    if (Object.values(act)[0] === '' && activities[0]) {
      //handle if one of the inputs are empty
      let a = activities[0]
      delete a[Object.keys(act)[0]]
      return setActivities([a])
    }

    switch (Object.keys(act)[0]) {
      case 'name':
        //enable buttons if some value has been added
        e.target.value.length === 0 ? setDisableButton(true) : setDisableButton(false)
        return (
          activities[0][Object.keys(act)[0]] !== Object.values(act)[0] && setActivities([{ ...activities[0], name: Object.values(act)[0] }])
        )
      case 'calories':
        //enable buttons if some value has been added
        e.target.value.length === 0 ? setDisableButton(true) : setDisableButton(false)
        return (
          activities[0][Object.keys(act)[0]] !== parseInt(Object.values(act)[0]) &&
          setActivities([{ ...activities[0], calories: parseInt(Object.values(act)[0]) }])
        )
      case 'activity_time':
        return (
          activities[0][Object.keys(act)[0]] !== parseInt(Object.values(act)[0]) &&
          setActivities([{ ...activities[0], activity_time: parseInt(Object.values(act)[0]) }])
        )
      case 'activity_length':
        return (
          activities[0][Object.keys(act)[0]] !== parseInt(Object.values(act)[0]) &&
          setActivities([{ ...activities[0], activity_length: parseInt(Object.values(act)[0]) }])
        )
      default:
        return
    }
  }

  const openCaloriefyListTab = async () => {
    /* SET LOADING */
    setActivitiesListLoader(true)

    // GET ALL ACTIVITIES FROM DB
    const response = await getActivities()

    if (response.status !== 200) {
      return toast.error(response.message || response || `Internal server error!`)
    } else {
      caloriefyDbDispatch({ type: 'SET_ACTIVITIES', payload: response.data })
      setActivitiesListLoader(false)
    }
  }

  const openCaloriefyHistoryTab = async () => {
    /* SET LOADING */
    setActivitiesHistoryLoader(true)

    // GET ACTIVITY HISTORY FROM DB
    const response = await getActivityHistory()

    if (response.status !== 200) {
      return toast.error(response.message || response || `Internal server error!`)
    } else {
      caloriefyDbDispatch({ type: 'SET_ACTIVITY_HISTORY', payload: response.data })
      setActivitiesHistoryLoader(false)
    }
  }

  return (
    <div>
      {console.log('Activity search render')}
      <Autocomplete
        options={activityList
          .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
          .filter(function (item, pos, ary) {
            return !pos || item.name !== ary[pos - 1].name
          })}
        onOpen={openCaloriefyListTab}
        loading={activitiesListLoader}
        loadingText='Loading Caliefy list..'
        onChange={(e, value) => {
          //set activities
          if (value) {
            setActivities([value])
            setDisableButton(false)
            activityName.current.focus()
            value.name && (activityName.current.value = value.name)
            value.calories && (activityCalories.current.value = value.calories)
            value.activity_time && (activityTime.current.value = value.activity_time)
            value.activity_length && (activityLength.current.value = value.activity_length)
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
            sx={{ backgroundColor: 'primary.light', borderTopRightRadius: 3, borderTopLeftRadius: 3, zIndex: 0 }}
            variant='filled'
            fullWidth
            label='Select from Caliefy list'
            placeholder='Activity Caliefy List'
          />
        )}
      />

      <Autocomplete
        options={activityHistory
          .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
          .filter(function (item, pos, ary) {
            return !pos || item.name !== ary[pos - 1].name
          })}
        onOpen={openCaloriefyHistoryTab}
        disabled={user === null ? true : false}
        loading={activitiesHistoryLoader}
        loadingText='Loading your history..'
        onChange={(e, value) => {
          //set activities
          if (value) {
            setActivities([value])
            setDisableButton(false)
            activityName.current.focus()
            value.name && (activityName.current.value = value.name)
            value.calories && (activityCalories.current.value = value.calories)
            value.activity_time && (activityTime.current.value = value.activity_time)
            value.activity_length && (activityLength.current.value = value.activity_length)
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
            sx={{ backgroundColor: 'primary.light', borderTopRightRadius: 3, borderTopLeftRadius: 3, zIndex: 0 }}
            variant='filled'
            fullWidth
            label='Or select from your Activity History'
            placeholder='Activity History'
          />
        )}
      />

      <Box>
        <FilledInput
          id='name'
          inputRef={activityName}
          sx={{ mb: 2 }}
          inputProps={{
            style: { paddingTop: '24px', paddingBottom: '8px' },
            maxLength: 200,
          }}
          required
          fullWidth
          type='text'
          placeholder='Add new activity *'
          startAdornment={
            <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Name *</Typography>
          }
          onBlur={(e) => e.currentTarget.value && updateCustomActs(e, { name: e.currentTarget.value })}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <OutlinedInput
          id='calories'
          inputRef={activityCalories}
          sx={{ mb: 2, flex: 1 }}
          inputProps={{
            style: { paddingTop: '24px', paddingBottom: '8px' },
            max: 9999,
          }}
          variant='outlined'
          type='number'
          startAdornment={
            <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Calories *</Typography>
          }
          onBlur={(e) => e.currentTarget.value && updateCustomActs(e, { calories: e.currentTarget.value })}
        />
        <OutlinedInput
          id='activityTime'
          inputRef={activityTime}
          sx={{ mb: 2, ml: 1, flex: 1 }}
          inputProps={{
            style: { paddingTop: '24px', paddingBottom: '8px' },
            max: 9999,
          }}
          variant='outlined'
          type='number'
          startAdornment={
            <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>
              Time length (minutes)
            </Typography>
          }
          onBlur={(e) => e.currentTarget.value && updateCustomActs(e, { activity_time: e.currentTarget.value })}
        />
        <OutlinedInput
          id='activityLength'
          inputRef={activityLength}
          sx={{ mb: 2, ml: 1, flex: 1 }}
          inputProps={{
            style: { paddingTop: '24px', paddingBottom: '8px' },
            max: 9999,
          }}
          variant='outlined'
          type='number'
          startAdornment={
            <Typography sx={{ position: 'absolute', top: 7, fontSize: '0.7rem', color: 'secondary.dark' }}>Length (km)</Typography>
          }
          onBlur={(e) => e.currentTarget.value && updateCustomActs(e, { activity_length: e.currentTarget.value })}
        />
      </Box>

      {console.log('ActivitySearchRender1')}
      {console.log(activities)}

      {activities[0].name && (
        <>
          {console.log('ActivitySearchRender2')}
          {console.log(activities)}

          <Tables id='activityTable' items={activities} />

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <ButtonGroup variant='contained' aria-label='outlined primary button group'>
              <Button color='cons' startIcon={<AddCircleRounded />} disabled={disableButton} onClick={postActivities}>
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

export default ActivitiesSearch
