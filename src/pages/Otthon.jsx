import { useContext, useCallback, useEffect } from 'react'
import { TextField, Box, InputAdornment } from '@mui/material'
import CaloriefyDbContext from '../context/caloriefydb/CaloriefyDbContext'
import { getHome } from '../context/caloriefydb/CaloriefyDbActions'
import { toast } from 'react-toastify'
import DeviceThermostatRoundedIcon  from '@mui/icons-material/DeviceThermostatRounded'
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';

function Otthon() {
  const { homeData, homeLoading, caloriefyDbDispatch } = useContext(CaloriefyDbContext)

  const setHomeData = useCallback(async () => {
    /* HANDLE LOADING */
    caloriefyDbDispatch({ type: 'SET_HOME_LOADING' })

    // GET HOME FROM DB
    const get_response = await getHome()
    if (get_response.status !== 200) {
      caloriefyDbDispatch({ type: 'CLEAR_HOME_LOADING' })
      return toast.error(get_response.message || get_response || `Internal server error!`)
    }

    caloriefyDbDispatch({ type: 'CLEAR_HOME_LOADING' })
    caloriefyDbDispatch({ type: 'SET_HOME', payload: get_response.data[0] })
  }, [caloriefyDbDispatch])

  useEffect(() => {
    setHomeData()
  }, [setHomeData])

  return (
    <>
      {console.log('Rendering Home Data')}
      {console.log('homeLoading: ' + homeLoading)}
      {homeLoading ? (
        <Box width='50%' margin='auto' sx={{ marginTop: 15 }}>
        <h5>Loading..</h5>
        </Box>
      ) : (
        <Box width='50%' margin='auto' sx={{ marginTop: 15 }}>
          <TextField
            id='temperature'
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <DeviceThermostatRoundedIcon />
                </InputAdornment>
              ),
            }}
            label='Temperature'
            readOnly
            variant='filled'
            value={homeData.temperature + '°C'}
            helperText={'Last update: ' + new Date(homeData.temperature_update_t).toString()}
          />
          <TextField
            id='humidity'
            sx={{ width: '100%', mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <InvertColorsRoundedIcon />
                </InputAdornment>
              ),
            }}
            variant='filled'
            label='Humidity'
            value={homeData.humidity + '%'}
            helperText={'Last update: ' + new Date(homeData.humidity_update_t).toString()}
            readOnly
          />
        </Box>
      )}
    </>
  )
}

export default Otthon
