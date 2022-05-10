import { createContext, useReducer } from "react";
import CalorieNinjaReducer from "./CalorieNinjaReducer";

const CalorieNinjaContext = createContext()

export const CalorieNinjaProvider = ({children}) => {
  const initialState = {
    nutritions: [],
    buttonsEnabled: true,
    calorieNinjaLoading: false
  }

  const [state, CalorieNinjaDispatch] = useReducer(CalorieNinjaReducer, initialState)

  return <CalorieNinjaContext.Provider value={{
    ...state,
    CalorieNinjaDispatch
  }}>
    {children}
  </CalorieNinjaContext.Provider>
}

export default CalorieNinjaContext