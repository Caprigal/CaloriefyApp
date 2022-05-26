import { Accordion, AccordionSummary, AccordionDetails, Typography, ListItem, IconButton } from '@mui/material'
import { deleteIntake, deleteActivity } from '../../context/caloriefydb/CaloriefyDbActions'
import { PropTypes } from 'prop-types'
import { ExpandMoreRounded, DeleteSweepRounded } from '@mui/icons-material'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { toast } from 'react-toastify'
import CaloriefyDbContext from '../../context/caloriefydb/CaloriefyDbContext'
import { useContext } from 'react'

function SidebarItem({ openFrom, color, expanded, disableGutters, totalSb, deleteBtn, dailyData }) {
  const { dailyIntakes, dailyActivities, caloriefyDbDispatch, intervalActivities, intervalIntakes } = useContext(CaloriefyDbContext)

  const showDetails = () => {
    if (openFrom === 'Burn' && !dailyData.activity_length && !dailyData.activity_time) {
      return false
    } else if (
      openFrom === 'Intake' &&
      !dailyData.carbohydrates_total_g &&
      !dailyData.fat_total_g &&
      !dailyData.protein_g &&
      !dailyData.serving_size_g
    ) {
      return false
    } else {
      return true
    }
  }

  const deleteData = async () => {
    let deletedId = dailyData.id
    const response = await (openFrom === 'Burn' ? deleteActivity(deletedId) : openFrom === 'Intake' && deleteIntake(deletedId))
    if (response.status !== 200) {
      return toast.error(response.message || response || `Internal server error!`)
    }

    if (openFrom === 'Burn') {
      caloriefyDbDispatch({ type: 'SET_DAILY_ACTIVITIES', payload: dailyActivities.filter((item) => item.id !== deletedId) })
      caloriefyDbDispatch({ type: 'SET_INTERVAL_ACTIVITIES', payload: intervalActivities.filter((item) => item.id !== deletedId) })
    } else {
      caloriefyDbDispatch({ type: 'SET_DAILY_INTAKES', payload: dailyIntakes.filter((item) => item.id !== deletedId) })
      caloriefyDbDispatch({ type: 'SET_INTERVAL_INTAKES', payload: intervalIntakes.filter((item) => item.id !== deletedId) })
    }
    toast.success(`Successfully deleted ${dailyData.name}`)
  }

  return (
    <Accordion
      sx={{ width: '100%', bgcolor: 'primary.main', color: 'primary.light', mb: 2 }}
      key={dailyData.name}
      defaultExpanded={expanded}
      disableGutters={disableGutters}
    >
      <AccordionSummary
        expandIcon={showDetails() && <ExpandMoreRounded sx={{ color: 'primary.light' }} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography
          variant='h2'
          sx={{
            color: 'secondary.light',
            textAlign: 'center',
            fontStyle: 'normal',
          }}
          key={dailyData.name}
        >
          {dailyData.name}
        </Typography>
        <Divider
          orientation='vertical'
          sx={{
            borderColor: 'primary.light',
            height: 'auto',
            mr: 1,
            ml: 1,
          }}
        />
        <Typography variant='h2' sx={{ color: color, textAlign: 'center' }} key={dailyData.calories}>
          {dailyData.calories} CALORIES
        </Typography>

        {!totalSb && deleteBtn && (
          <>
            <Divider
              orientation='vertical'
              sx={{
                borderColor: 'primary.light',
                height: 'auto',
                mr: 1,
                ml: 1.5,
              }}
            />
            <IconButton onClick={deleteData} sx={{ color: 'secondary.light', padding: 0 }}>
              <DeleteSweepRounded />
            </IconButton>
          </>
        )}
      </AccordionSummary>

      {showDetails() && (
        <AccordionDetails sx={{ padding: 0, paddingBottom: 0.5, bgcolor: color }}>
          <List dense={true} sx={{ padding: 0 }}>
            {dailyData.serving_size_g ? (
              <ListItem>
                <Typography variant='body1'>Serving size:&nbsp;</Typography>
                <Typography variant='body1'>{dailyData.serving_size_g}&nbsp;(g)</Typography>
              </ListItem>
            ) : (
              <ListItem />
            )}
            {dailyData.carbohydrates_total_g ? (
              <ListItem>
                <Typography variant='body1'>Carbs:&nbsp;</Typography>
                <Typography variant='body1'> {dailyData.carbohydrates_total_g}&nbsp;(g)</Typography>
              </ListItem>
            ) : (
              <></>
            )}
            {dailyData.protein_g ? (
              <ListItem>
                <Typography variant='body1'>Protein:&nbsp;</Typography>
                <Typography variant='body1'>{dailyData.protein_g}&nbsp;(g)</Typography>
              </ListItem>
            ) : (
              <></>
            )}
            {dailyData.fat_total_g ? (
              <ListItem>
                <Typography variant='body1'>Fat:&nbsp;</Typography>
                <Typography variant='body1'>{dailyData.fat_total_g}&nbsp;(g)</Typography>
              </ListItem>
            ) : (
              <></>
            )}
            {dailyData.activity_time ? (
              <ListItem>
                <Typography variant='body1'>Activity&nbsp;Time&nbsp;Length:&nbsp;</Typography>
                <Typography variant='body1'>{dailyData.activity_time}&nbsp;(mins)</Typography>
              </ListItem>
            ) : (
              <></>
            )}
            {dailyData.activity_length ? (
              <ListItem>
                <Typography variant='body1'>Activity&nbsp;Length:&nbsp;</Typography>
                <Typography variant='body1'>{dailyData.activity_length}&nbsp;(km)</Typography>
              </ListItem>
            ) : (
              <></>
            )}
          </List>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

SidebarItem.propTypes = {
  dailyData: PropTypes.object.isRequired,
}

export default SidebarItem
