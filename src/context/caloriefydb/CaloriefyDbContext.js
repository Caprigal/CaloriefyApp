import { createContext, useReducer } from "react";
import CaloriefyDbReducer from "./CaloriefyDbReducer";

const CaloriefyDbContext = createContext()

export const CaloriefyDbProvider = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const initialState = {
    dailyIntakes: [],
    dailyActivities: [],
    intakesList: [],
    intakesHistory: [],
    activityList: [],
    activityHistory: [],
    intervalIntakes: [],
    intervalActivities: [],
    user: user ? user : null,
    intakesIntervalLoading: false,
    activitiesIntervalLoading: false,
  }

  const [state, caloriefyDbDispatch] = useReducer(CaloriefyDbReducer, initialState)

  return <CaloriefyDbContext.Provider value={{
    ...state,
    caloriefyDbDispatch
  }}>
    {children}
  </CaloriefyDbContext.Provider>
}

export default CaloriefyDbContext