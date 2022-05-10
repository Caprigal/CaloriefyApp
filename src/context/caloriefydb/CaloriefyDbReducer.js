const CaloriefyDbReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { username: action.payload.username, email: action.payload.email },
        caloriefyDbLoading: false,
      }
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        caloriefyDbLoading: false,
      }
    case 'SET_DAILY_INTAKES':
      return {
        ...state,
        dailyIntakes: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_INTERVAL_INTAKES':
      return {
        ...state,
        intervalIntakes: action.payload,
        caloriefyDbLoading: false,
      }
    case 'CLEAR_INTERVAL_INTAKES':
      return {
        ...state,
        intervalIntakes: [],
        caloriefyDbLoading: false,
      }
    case 'SET_INTAKES':
      return {
        ...state,
        intakesList: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_INTAKES_HISTORY':
      return {
        ...state,
        intakesHistory: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_DAILY_ACTIVITIES':
      return {
        ...state,
        dailyActivities: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_INTERVAL_ACTIVITIES':
      return {
        ...state,
        intervalActivities: action.payload,
        caloriefyDbLoading: false,
      }
    case 'CLEAR_INTERVAL_ACTIVITIES':
      return {
        ...state,
        intervalActivities: [],
        caloriefyDbLoading: false,
      }
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activityList: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_ACTIVITY_HISTORY':
      return {
        ...state,
        activityHistory: action.payload,
        caloriefyDbLoading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        caloriefyDbLoading: true,
      }
    default:
      return state
  }
}

export default CaloriefyDbReducer
