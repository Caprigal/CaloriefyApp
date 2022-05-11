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

function IntervalTabs(props) {
  const { caloriefyDbDispatch, intervalIntakes, intervalActivities } = useContext(CaloriefyDbContext)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const handleDateFromChange = async (newDate) => {
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
              <Divider sx={{ mt: 2 }} />
              <SidebarItem
                color='burn.main'
                openFrom={'Burn'}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                dailyData={totalDataCalc(intervalActivities)}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {intervalActivities.length > 0 &&
            intervalActivities.map((item, i) => <SidebarItem color='burn.main' openFrom={'Burn'} key={item.id} dailyData={item} />)}
        </Box>
        <Box sx={{ ml: '1%', width: '49%' }}>
          {intervalIntakes.length > 0 && (
            <>
              <Divider sx={{ mt: 2 }} />
              <SidebarItem
                color='cons.main'
                openFrom={'Intake'}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                dailyData={totalDataCalc(intervalIntakes)}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {intervalIntakes.length > 0 &&
            intervalIntakes.map((item, i) => <SidebarItem color='cons.main' openFrom={'Intake'} key={item.id} dailyData={item} />)}
        </Box>
      </Box>
    </div>
  )
}

export default IntervalTabs
