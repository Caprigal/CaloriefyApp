import Box from '@mui/material/Box'
import { Typography, TextField, Button, Link, InputAdornment } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@mui/material'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { loginUser } from '../context/caloriefydb/CaloriefyDbActions'
import CaloriefyDbContext from '../context/caloriefydb/CaloriefyDbContext'
import { toast } from 'react-toastify'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'

function Signin() {
  const { caloriefyDbDispatch } = useContext(CaloriefyDbContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUserClick = async (e) => {
    e.preventDefault()

    if (username === '' || !username || password === '' || !password) {
      toast.warning('Missing fields!')
    } else {
      const set_response = await loginUser({ username: username, password: password })
      if (set_response.status !== 200) {
        return toast.error(set_response.message || set_response || `Internal server error!`)
      }

      caloriefyDbDispatch({ type: 'SET_USER', payload: set_response.data })
      localStorage.setItem('user', JSON.stringify(set_response.data))
      navigate('/')
    }
  }

  return (
    <>
      <Box sx={{ marginTop: 15 }}>
        <Box width='50%' margin='auto'>
          <form>
            <Typography variant='h1'>Sign in</Typography>
            <Typography variant='h4' sx={{ letterSpacing: '12px' }}>
              Sign in
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
            <MaterialLink component={RouterLink} variant='inherit' to='/register' sx={{position: 'relative', top: '8px'}}>
              Don't have account? Register here!
            </MaterialLink>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant='contained'
                type='submit'
                startIcon={<LoginRoundedIcon />}
                disabled={username.length && password.length ? false : true}
                onClick={loginUserClick}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Signin
