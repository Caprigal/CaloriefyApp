import Box from '@mui/material/Box'
import { useContext, useState, useEffect, useCallback } from 'react'
import { Typography, Tabs, Tab } from '@mui/material'
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews'
import TabPanelLayout from '../components/layout/TabPanel'
import { getIntervalActivities, getIntervalIntakes } from '../context/caloriefydb/CaloriefyDbActions'
import { toast } from 'react-toastify'
import IntervalTabs from '../components/layout/IntervalTabs'
import CaloriefyDbContext from '../context/caloriefydb/CaloriefyDbContext'

function Home() {
  const [tabs, setTabs] = useState(0)
  const { caloriefyDbDispatch } = useContext(CaloriefyDbContext)

  const setIntervalData = useCallback(
    async (beforeDate) => {
      /* HANDLE LOADING */
      caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES_LOADING' })
      caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES_LOADING' })

      // GET ACTIVITIES FROM DB (TO GET WHOLE INTERVAL DATA)
      const get_response = await getIntervalActivities(beforeDate, new Date())
      if (get_response.status !== 200) {
        caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES_LOADING' })
        caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES_LOADING' })
        return toast.error(get_response.message || get_response || `Internal server error!`)
      }

      caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES', payload: get_response.data })

      // GET INTAKES FROM DB (TO GET WHOLE INTERVAL DATA)
      const get_int_response = await getIntervalIntakes(beforeDate, new Date())
      if (get_int_response.status !== 200) {
        caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES_LOADING' })
        caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES_LOADING' })
        return toast.error(get_int_response.message || get_int_response || `Internal server error!`)
      }

      caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES', payload: get_int_response.data })
    },
    [caloriefyDbDispatch]
  )

  useEffect(() => {
    const currentDate = new Date()
    const beforeDate = new Date(currentDate.setDate(currentDate.getDate() - 1))

    setIntervalData(beforeDate)
  }, [setIntervalData])

  const handleChange = async (event, newTab) => {
    /* CLEAR FIRST */
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_INTAKES' })
    caloriefyDbDispatch({ type: 'CLEAR_INTERVAL_ACTIVITIES' })

    const currentDate = new Date()
    const beforeDate = new Date(currentDate.setDate(currentDate.getDate() - (newTab === 0 ? 1 : newTab === 1 ? 7 : newTab === 2 ? 30 : 1)))

    setTabs(newTab)

    setIntervalData(beforeDate)
  }

  const handleChangeIndex = (index) => {
    setTabs(index)
  }

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }
  }

  return (
    <>
      {console.log('Home render')}
      <Box sx={{ marginTop: 15 }}>
        <Typography variant='h1'>Dashboard</Typography>
        <Typography variant='h4' sx={{ letterSpacing: '12px' }}>
          Dashboard
        </Typography>

        <Tabs value={tabs} variant='fullWidth' onChange={handleChange} aria-label='tabs'>
          <Tab label='Today' {...a11yProps(0)} />
          <Tab label='Last 7 days' {...a11yProps(1)} />
          <Tab label='Last 30 days' {...a11yProps(2)} />
          <Tab label='Custom' {...a11yProps(3)} />
        </Tabs>

        <SwipeableViews index={tabs} onChangeIndex={handleChangeIndex}>
          <TabPanelLayout value={tabs} index={0}>
            <IntervalTabs tab='todayTab' />
          </TabPanelLayout>
          <TabPanelLayout value={tabs} index={1}>
            <IntervalTabs tab='weekTab' />
          </TabPanelLayout>
          <TabPanelLayout value={tabs} index={2}>
            <IntervalTabs tab='monthTab' />
          </TabPanelLayout>
          <TabPanelLayout value={tabs} index={3}>
            <IntervalTabs tab='customTab' />
          </TabPanelLayout>
        </SwipeableViews>
      </Box>
    </>
  )
}

export default Home
