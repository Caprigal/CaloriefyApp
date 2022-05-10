import Box from '@mui/material/Box'
import ActivitiesSearch from '../components/activities/ActivitiesSearch'
import { useContext } from 'react'
import Sidebar from '../components/layout/Sidebar'
import { Typography, IconButton } from '@mui/material'
import DatePickerLayout from '../components/layout/DatePickerLayout'
import SidebarContext from '../context/sidebar/SidebarContext'
import { FirstPageRounded } from '@mui/icons-material'

function Burn() {
  const { value, setValue, sidebar, openActivityDrawerManually } = useContext(SidebarContext)

  return (
    <>
      {!sidebar && (
        <>
          <IconButton
            aria-label='open'
            sx={{ top: 80, right: 14, position: 'absolute', color: 'primary.dark' }}
            onClick={openActivityDrawerManually}
          >
            <FirstPageRounded fontSize='large' />
          </IconButton>
        </>
      )}
      {console.log('Burn render')}
      <Sidebar openFrom='Burn' datePickerHelperText='No activities recorded yet' />

      <Box sx={{ marginTop: 15 }}>
        <Typography variant='h1'>Add your recent activities</Typography>
        <Typography variant='h4' sx={{letterSpacing: '12px'}}>
          Activities
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

        <ActivitiesSearch />
      </Box>
    </>
  )
}

export default Burn
