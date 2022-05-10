const CalorieNinjaReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_NUTRITIONS':
      return {
        ...state,
        nutritions: [],
      }
    case 'ENABLE_BUTTONS':
      return {
        ...state,
        buttonsEnabled: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        calorieNinjaLoading: true,
      }
    default:
      return state
  }
}

export default CalorieNinjaReducer
