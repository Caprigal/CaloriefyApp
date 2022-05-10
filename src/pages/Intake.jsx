import NutritionSearch from '../components/nutritions/NutritionSearch'
import Box from '@mui/material/Box'
import { useContext, useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import SidebarContext from '../context/sidebar/SidebarContext'
import { IconButton } from '@mui/material'
import { FirstPageRounded } from '@mui/icons-material'
import { Tabs, Tab, Typography } from '@mui/material'
import DatePickerLayout from '../components/layout/DatePickerLayout'
import SwipeableViews from 'react-swipeable-views'
import TabPanelLayout from '../components/layout/TabPanel'

function Intake() {
  const { value, setValue, sidebar, openIntakeDrawerManually } = useContext(SidebarContext)
  const [tabs, setTabs] = useState(0)

  const handleChange = (event, newTab) => {
    setTabs(newTab)
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
      {!sidebar && (
        <>
          <IconButton aria-label='open' sx={{ top: 80, right: 14, position: 'absolute', color:'primary.dark' }} onClick={openIntakeDrawerManually}>
            <FirstPageRounded fontSize='large' />
          </IconButton>
        </>
      )}
      {console.log("Intakes render")}
      <Sidebar openFrom='Intake' datePickerHelperText='No consumptions recorded yet'/>

      <Box sx={{ marginTop: 15 }}>
        <Typography variant='h1'>Add your recently consumed foods or drinks</Typography>
        <Typography variant='h4'>
          Intakes
        </Typography>

        <DatePickerLayout
          style={{ marginBottom: 2, width: '50%' }}
          label='Select Date to Add'
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          disabled={false}
          readOnly={false}
          variant='filled'
        />

        <Tabs value={tabs} variant='fullWidth' onChange={handleChange} aria-label='tabs'>
          <Tab label='Add manually'  {...a11yProps(0)} />
          <Tab label='Search'  {...a11yProps(1)} />
        </Tabs>

        <SwipeableViews index={tabs} onChangeIndex={handleChangeIndex}>
          <TabPanelLayout value={tabs} index={0} >
            <NutritionSearch tab='listTab' />
          </TabPanelLayout>
          <TabPanelLayout value={tabs} index={1}>
            <NutritionSearch tab='searchTab' />
          </TabPanelLayout>
        </SwipeableViews>
      </Box>
    </>
  )
}

export default Intake
