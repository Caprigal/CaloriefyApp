import { totalDataCalc } from '../../Utility'
import { DatePicker } from '@mui/lab'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useState, useContext } from 'react'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import { getIntervalActivities, getIntervalIntakes } from '../../context/caloriefydb/CaloriefyDbActions'
import { toast } from 'react-toastify'
import { TextField, Box, Divider } from '@mui/material'
import SidebarItem from './SidebarItem'
import { calculateBCB } from '../../Utility'

function IntervalTabs(props) {
  const { caloriefyDbDispatch, intervalIntakes, intervalActivities, intakesIntervalLoading, activitiesIntervalLoading, user } =
    useContext(CaloriefyDbContext)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const handleDateFromChange = async (newDate) => {
    /* CLEAR FIRST */
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES' })
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES' })

    /* HANDLE LOADING */
    caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES_LOADING' })
    caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKE_LOADING' })

    setFromDate(newDate)

    // GET ACTIVITIES FROM DB (TO GET WHOLE INTERVAL DATA)
    const get_response = await getIntervalActivities(newDate, toDate)
    if (get_response.status !== 200) {
      return toast.error(get_response.message || get_response || `Internal server error!`)
    }

    caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES', payload: get_response.data })

    // GET INTAKES FROM DB (TO GET WHOLE INTERVAL DATA)
    const get_int_response = await getIntervalIntakes(newDate, toDate)
    if (get_int_response.status !== 200) {
      return toast.error(get_int_response.message || get_int_response || `Internal server error!`)
    }

    caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES', payload: get_int_response.data })
  }

  const handleDateToChange = async (newDate) => {
    /* CLEAR FIRST */
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES' })
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES' })

    /* HANDLE LOADING */
    caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITY_LOADING' })
    caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES_LOADING' })
    setToDate(newDate)

    // GET ACTIVITIES FROM DB (TO GET WHOLE INTERVAL DATA)
    const get_response = await getIntervalActivities(fromDate, newDate)
    if (get_response.status !== 200) {
      return toast.error(get_response.message || get_response || `Internal server error!`)
    }

    caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES', payload: get_response.data })

    // GET INTAKES FROM DB (TO GET WHOLE INTERVAL DATA)
    const get_int_response = await getIntervalIntakes(fromDate, newDate)
    if (get_int_response.status !== 200) {
      return toast.error(get_int_response.message || get_int_response || `Internal server error!`)
    }

    caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES', payload: get_int_response.data })
  }

  return (
    <div style={{ width: '105.9%', marginLeft: '-23px' }}>
      {props.tab === 'customTab' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ marginBottom: 2, width: '48%', mr: '1%' }}
            label='From -'
            value={fromDate}
            onChange={(newValue) => handleDateFromChange(newValue)}
            disabled={false}
            readOnly={false}
            renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2, width: '49%', mr: '1%' }} />}
            variant='filled'
          />
          <DatePicker
            sx={{ marginBottom: 2, width: '48%', ml: '1%' }}
            label='- To'
            value={toDate}
            onChange={(newValue) => handleDateToChange(newValue)}
            disabled={false}
            readOnly={false}
            renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2, width: '49%', ml: '1%' }} />}
            variant='filled'
          />
        </LocalizationProvider>
      )}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mr: '1%', width: '49%' }}>
          {intervalActivities.length > 0 && (
            <>
              <SidebarItem
                color='burn.main'
                openFrom={'Burn'}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                deleteBtn={true}
                dailyData={totalDataCalc(intervalActivities, 'activity')}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {intervalActivities.length > 0 &&
            intervalActivities.map((item, i) => <SidebarItem color='burn.main' openFrom={'Burn'} key={item.id} deleteBtn={true} dailyData={item} />)}

          {intervalActivities.length > 0 && user.lifestyle && user.weight && user.height && user.birthdate && user.gender ? (
            <SidebarItem
              color='burn.main'
              openFrom='Burn'
              key='Base calorie burn'
              deleteBtn={false}
              dailyData={{
                name: 'Base calorie burn',
                calories: calculateBCB(user.lifestyle, user.weight, user.height, user.birthdate, user.gender),
              }}
            />
          ) : <></>}

          {!activitiesIntervalLoading && intervalActivities.length === 0 && <h5>No activities found</h5>}

          {activitiesIntervalLoading && <h5>Loading..</h5>}
        </Box>
        <Box sx={{ ml: '1%', width: '49%' }}>
          {intervalIntakes.length > 0 && (
            <>
              <SidebarItem
                color='cons.main'
                openFrom={'Intake'}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                deleteBtn={true}
                dailyData={totalDataCalc(intervalIntakes, 'intake')}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {intervalIntakes.length > 0 &&
            intervalIntakes.map((item, i) => (
              <SidebarItem color='cons.main' openFrom={'Intake'} key={item.id} deleteBtn={true} dailyData={item} />
            ))}

          {!intakesIntervalLoading && intervalIntakes.length === 0 && <h5>No intakes found</h5>}

          {intakesIntervalLoading && <h5>Loading..</h5>}
        </Box>
      </Box>
    </div>
  )
}

export default IntervalTabs
