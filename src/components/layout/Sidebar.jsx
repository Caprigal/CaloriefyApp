import { useContext } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import DatePickerLayout from './DatePickerLayout'
import { LastPageRounded } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import SidebarContext from '../../context/sidebar/SidebarContext'
import SidebarItem from './SidebarItem'
import { totalDataCalc } from '../../Utility'

function Sidebar(props) {
  const { dailyIntakes, dailyActivities } = useContext(CaloriefyDbContext)
  const { value, setValue, sidebar, toggleDrawer } = useContext(SidebarContext)

  return (
    <Drawer
      open={sidebar}
      anchor='right'
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.light',
        },
      }}
    >
      {console.log('Sidebar render')}
      <Box sx={{ pt: '65px', width: 400, paddingBottom: 2 }} role='presentation'>
        <IconButton aria-label='close' sx={{ position: 'fixed', mt: 2, ml: 2, mr: 4, color:'primary.dark' }} onClick={toggleDrawer(false)}>
          <LastPageRounded fontSize='large' />
        </IconButton>

        <Typography variant='h3' sx={{margin: '28px', mb: 0}}>
          Activity History
        </Typography>

        <Box sx={{ ml: 4, mr: 4, mt: 2 }}>
          <DatePickerLayout
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            disabled={true}
            fullWidth={true}
            readOnly={true}
            inputFormat='yyyy/MM/dd'
            variant='filled'
            label='Date can be modified on the main page'
            helperText={
              props.openFrom === 'Intake' && dailyIntakes && dailyIntakes.length === 0
                ? props.datePickerHelperText
                : props.openFrom === 'Burn' && dailyActivities && dailyActivities.length === 0
                ? props.datePickerHelperText
                : null
            }
          />

          {props.openFrom === 'Intake' && dailyIntakes.length > 0 && (
            <>
              <Divider sx={{ mt: 2 }} />
              <SidebarItem
                color='cons.main'
                openFrom={props.openFrom}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                dailyData={totalDataCalc(dailyIntakes)}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {props.openFrom === 'Intake' &&
            dailyIntakes.length > 0 &&
            dailyIntakes.map((item, i) => <SidebarItem color='cons.main' openFrom={props.openFrom} key={item.id} dailyData={item} />)}

          {props.openFrom === 'Burn' && dailyActivities.length > 0 && (
            <>
              <Divider sx={{ mt: 2 }} />
              <SidebarItem
                color='burn.main'
                openFrom={props.openFrom}
                key='total'
                totalSb={true}
                expanded={true}
                disableGutters={true}
                dailyData={totalDataCalc(dailyActivities)}
              />
              <Divider sx={{ mt: 2 }} />
            </>
          )}

          {props.openFrom === 'Burn' &&
            dailyActivities.length > 0 &&
            dailyActivities.map((item, i) => <SidebarItem color='burn.main' openFrom={props.openFrom} key={item.id} dailyData={item} />)}
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
