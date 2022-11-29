import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHamburger, FaFire, FaRunning, FaFortAwesome } from 'react-icons/fa'
import { useContext } from 'react'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';

function Navbar() {
  const { caloriefyDbDispatch, user } = useContext(CaloriefyDbContext)
  const navigate = useNavigate()
  const location = useLocation()

  const signOutClick = async (e) => {
    e.preventDefault()

    caloriefyDbDispatch({ type: 'CLEAR_USER' })
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES' })
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES' })
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>
      {location.pathname.includes('otthon') ? (
        <AppBar position='fixed'>
          <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'homemanager.dark' }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }} />
            <MaterialLink component={RouterLink} underline='none' variant='h2' to='/otthon' sx={{ color: 'homemanager.main' }}>
              <ChairRoundedIcon style={{ position: 'absolute', marginLeft: '-26px' }}/>
              LIVING ROOM
            </MaterialLink>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <MaterialLink component={RouterLink} variant='h2' underline='none' color='inherit' fontStyle={'normal'} to='/otthon'>
                <FaFortAwesome fontSize={22} style={{ position: 'absolute', marginLeft: '-26px' }} />
                CAPRIHOME
              </MaterialLink>
              <Divider orientation='vertical' variant='fullWidth' flexItem sx={{ borderColor: 'homemanager.light', ml: 1, mr: 1 }} />
              {!user ? (
                <MaterialLink component={RouterLink} variant='h2' underline='none' to='/signin' color='inherit'>
                  SIGN IN
                </MaterialLink>
              ) : (
                <>
                  <MaterialLink variant='h2' underline='none' color='inherit' fontStyle='normal'>
                    {user.username}
                  </MaterialLink>

                  <Divider orientation='vertical' variant='fullWidth' flexItem sx={{ borderColor: 'homemanager.light', ml: 1, mr: 1 }} />

                  <MaterialLink component={RouterLink} variant='h2' underline='none' to='/' color='inherit' onClick={signOutClick}>
                    SIGN OUT
                  </MaterialLink>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position='fixed'>
          <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'primary.dark' }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }} />
            <MaterialLink component={RouterLink} underline='none' variant='h2' to='/burn' sx={{ color: 'burn.main' }}>
              <FaFire fontSize={18} />
              CALORIE BURN
            </MaterialLink>
            <Divider orientation='vertical' variant='middle' flexItem sx={{ borderColor: 'primary.light', ml: 2, mr: 2, mt: 2, mb: 2 }} />
            <MaterialLink component={RouterLink} underline='none' variant='h2' to='/intake' sx={{ color: 'cons.main' }}>
              <FaHamburger fontSize={18} />
              CALORIE INTAKE
            </MaterialLink>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <MaterialLink component={RouterLink} variant='h2' underline='none' color='inherit' fontStyle={'normal'} to='/'>
                <FaRunning fontSize={22} style={{ position: 'absolute', marginLeft: '-26px' }} />
                CALIEFY
              </MaterialLink>
              <Divider orientation='vertical' variant='fullWidth' flexItem sx={{ borderColor: 'primary.light', ml: 1, mr: 1 }} />
              {!user ? (
                <MaterialLink component={RouterLink} variant='h2' underline='none' to='/signin' color='inherit'>
                  SIGN IN
                </MaterialLink>
              ) : (
                <>
                  <MaterialLink variant='h2' underline='none' color='inherit' fontStyle='normal'>
                    {user.username}
                  </MaterialLink>

                  <Divider orientation='vertical' variant='fullWidth' flexItem sx={{ borderColor: 'primary.light', ml: 1, mr: 1 }} />

                  <MaterialLink component={RouterLink} variant='h2' underline='none' to='/' color='inherit' onClick={signOutClick}>
                    SIGN OUT
                  </MaterialLink>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default Navbar
