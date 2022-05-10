import { createContext, useState, useContext } from 'react'
import { getDailyIntakes, getDailyActivities } from '../../context/caloriefydb/CaloriefyDbActions'
import CaloriefyDbContext from '../caloriefydb/CaloriefyDbContext'
import { toast } from 'react-toastify'

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)
  const [value, setValue] = useState(new Date())
  const { caloriefyDbDispatch } = useContext(CaloriefyDbContext)

  const openIntakeDrawerManually = async () => {
    // GET NUTRITIONS FROM DB (TO GET WHOLE DAY DATA)
    const get_response = await getDailyIntakes(value)
    if (get_response.status !== 200) {
      return toast.error(get_response.message || get_response || `Internal server error!`)
    } 

    // SET NUTRITIONS TO SIDEBAR
    caloriefyDbDispatch({ type: 'SET_DAILY_INTAKES', payload: get_response.data })

    setSidebar(true)
  }
  
  const openActivityDrawerManually = async () => {
    // GET NUTRITIONS FROM DB (TO GET WHOLE DAY DATA)
    const get_response = await getDailyActivities(value)
    if (get_response.status !== 200) {
      return toast.error(get_response.message || get_response || `Internal server error!`)
    } 

    // SET NUTRITIONS TO SIDEBAR
    caloriefyDbDispatch({ type: 'SET_DAILY_ACTIVITIES', payload: get_response.data })

    setSidebar(true)
  }

  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    state ? setSidebar(true) : setSidebar(false)
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        value,
        openIntakeDrawerManually,
        openActivityDrawerManually,
        setValue,
        setSidebar,
        toggleDrawer,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext
