import Box from '@mui/material/Box'
import { Typography, TextField, Button, InputLabel, Select, MenuItem, FormControl, InputAdornment } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import CaloriefyDbContext from '../context/caloriefydb/CaloriefyDbContext'
import { toast } from 'react-toastify'
import { setNewUser } from '../context/caloriefydb/CaloriefyDbActions'
import DatePickerLayout from '../components/layout/DatePickerLayout'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { calculateBCB } from '../Utility'

function Register() {
  const { caloriefyDbDispatch } = useContext(CaloriefyDbContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [birthDate, setBirthDate] = useState(null)
  const [lifestyle, setLifestyle] = useState('')
  const [gender, setGender] = useState('')
  const [baseCalorieBurn, setBaseCalorieBurn] = useState('Please fill the additional informations below')
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)

  const handleLifeStyleChange = (event) => {
    setLifestyle(event.target.value)

    setBaseCalorieBurn(calculateBCB(event.target.value, weight, height, birthDate, gender))
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value)

    setBaseCalorieBurn(calculateBCB(lifestyle, weight, height, birthDate, event.target.value))
  }

  const handleBirthChange = (newDate) => {
    setBirthDate(newDate)

    setBaseCalorieBurn(calculateBCB(lifestyle, weight, height, newDate, gender))
  }

  const handleWeightChange = (event) => {
    setWeight(parseInt(event.target.value))

    setBaseCalorieBurn(calculateBCB(lifestyle, parseInt(event.target.value), height, birthDate, gender))
  }

  const handleHeightChange = (event) => {
    setHeight(parseInt(event.target.value))

    setBaseCalorieBurn(calculateBCB(lifestyle, weight, parseInt(event.target.value), birthDate, gender))
  }

  const registerUser = async (e) => {
    e.preventDefault()

    if (username === '' || !username || email === '' || !email || password === '' || password2 === '' || !password || !password2) {
      toast.warning('Missing fields!')
    } else {
      const set_response = await setNewUser({
        username: username,
        email: email,
        password: password,
        birthdate: birthDate ? birthDate.getFullYear() : 0,
        lifestyle: lifestyle ? lifestyle : 0,
        gender: gender ? gender : 0,
        weight: weight ? weight : 0,
        height: height ? height : 0,
        basecalorieburn: isNaN(baseCalorieBurn) ? 0 : baseCalorieBurn,
      })
      if (set_response.status !== 201) {
        return toast.error(set_response.message || set_response || `Internal server error!`)
      }

      toast.success(`Welcome ${set_response.data.username}!`)

      caloriefyDbDispatch({ type: 'SET_USER', payload: set_response.data })
      localStorage.setItem('user', JSON.stringify(set_response.data))
      navigate('/')
    }
  }

  return (
    <>
      <Box sx={{ marginTop: 15 }}>
        <Box width='50%' margin='auto'>
          <form onSubmit={registerUser}>
            <Typography variant='h1'>Registration</Typography>
            <Typography variant='h4' sx={{ letterSpacing: '12px' }}>
              Registration
            </Typography>
            <TextField
              id='username'
              sx={{ width: '100%' }}
              autoFocus
              inputProps={{
                maxLength: 12,
                minLength: 6,
                pattern: '^[A-Za-z0-9]+$',
                title: '6-12 digits required, accents and spaces are not available',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
              helperText={`6-12 digits required, accents and spaces are not available`}
              label='Username'
              type='username'
              required
              variant='filled'
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <TextField
              id='email'
              sx={{ width: '100%', mt: 2 }}
              inputProps={{
                maxLength: 40,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailRoundedIcon />
                  </InputAdornment>
                ),
              }}
              helperText={`Maximum 40 digits, accents and spaces are not available`}
              type='email'
              label='E-mail'
              required
              variant='filled'
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
              id='password'
              sx={{ width: '100%', mt: 2 }}
              inputProps={{
                maxLength: 12,
                minLength: 6,
                title: '6-12 digits required',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockRoundedIcon />
                  </InputAdornment>
                ),
              }}
              helperText={`6-12 digits required`}
              variant='filled'
              label='Password'
              required
              type='password'
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <TextField
              id='password2'
              sx={{ width: '100%', mt: 2 }}
              variant='filled'
              label='Confirm password'
              required
              inputProps={{
                maxLength: 12,
                minLength: 6,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockRoundedIcon />
                  </InputAdornment>
                ),
              }}
              type='password'
              onChange={(e) => setPassword2(e.currentTarget.value)}
            />
            <Typography variant='h6' sx={{ mt: 2, mb: 2 }}>
              In order to calculate your base daily calorie burning please add the following informations:
            </Typography>
            <FormControl fullWidth>
              <InputLabel id='gender-label'>Gender</InputLabel>
              <Select labelId='gender-label' id='gender-select' value={gender} label='Gender' onChange={handleGenderChange} sx={{ mb: 2 }}>
                <MenuItem value={0}>Female</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='lifestyle-label'>Lifestyle</InputLabel>
              <Select
                labelId='lifestyle-label'
                id='lifestyle-select'
                value={lifestyle}
                label='Lifestyle'
                onChange={handleLifeStyleChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value={20}>Office job / Home office / Student lifestyle</MenuItem>
                <MenuItem value={35}>Job with average activity</MenuItem>
                <MenuItem value={50}>Job with easy physical activities</MenuItem>
                <MenuItem value={70}>Job with hard physical activities</MenuItem>
              </Select>
            </FormControl>
            <DatePickerLayout
              views={['year']}
              value={birthDate}
              onChange={(newValue) => handleBirthChange(newValue)}
              fullWidth={true}
              variant='outlined'
              inputFormat='yyyy'
              label='Date of birth'
            />
            <TextField
              label='Weight'
              id='weight-input'
              fullWidth
              inputProps={{
                min: 1,
                max: 399,
              }}
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>kg</InputAdornment>,
              }}
              onChange={handleWeightChange}
              sx={{ mt: 2, width: '49%', mr: '1%' }}
            />
            <TextField
              label='Height'
              id='height-input'
              fullWidth
              inputProps={{
                min: 1,
                max: 399,
              }}
              type='number'
              InputProps={{
                endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
              }}
              onChange={handleHeightChange}
              sx={{ mt: 2, width: '49%', ml: '1%' }}
            />
            <TextField
              label='Your base daily calorie burn:'
              id='daily-cal-burn-input'
              fullWidth
              disabled
              variant='filled'
              value={baseCalorieBurn}
              InputProps={{
                endAdornment: <InputAdornment position='end'>calories</InputAdornment>,
              }}
              sx={{ mt: 2 }}
            />
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant='contained'
                type='submit'
                startIcon={<PersonAddAlt1RoundedIcon />}
                disabled={username.length && password.length && password2.length && password === password2 ? false : true}
                sx={{ mb: 6 }}
              >
                Create Account
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Register
