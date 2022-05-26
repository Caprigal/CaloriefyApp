const CaloriefyDbReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { username: action.payload.username, email: action.payload.email },
      }
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      }
    case 'SET_DAILY_INTAKES':
      return {
        ...state,
        dailyIntakes: action.payload,
      }
    case 'SET_INTERVAL_INTAKES':
      return {
        ...state,
        intervalIntakes: action.payload,
        intakesIntervalLoading: false,
      }
    case 'CLEAR_INTERVAL_INTAKES':
      return {
        ...state,
        intervalIntakes: [],
      }
    case 'SET_INTAKES':
      return {
        ...state,
        intakesList: action.payload,
      }
    case 'SET_INTAKES_HISTORY':
      return {
        ...state,
        intakesHistory: action.payload,
      }
    case 'SET_INTERVAL_INTAKES_LOADING':
      return {
        ...state,
        intakesIntervalLoading: true,
      }
    case 'CLEAR_INTERVAL_INTAKES_LOADING':
      return {
        ...state,
        intakesIntervalLoading: false,
      }
    case 'SET_DAILY_ACTIVITIES':
      return {
        ...state,
        dailyActivities: action.payload,
      }
    case 'SET_INTERVAL_ACTIVITIES':
      return {
        ...state,
        intervalActivities: action.payload,
        activitiesIntervalLoading: false,
      }
    case 'CLEAR_INTERVAL_ACTIVITIES':
      return {
        ...state,
        intervalActivities: [],
      }
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activityList: action.payload,
      }
    case 'SET_ACTIVITY_HISTORY':
      return {
        ...state,
        activityHistory: action.payload,
      }
    case 'SET_INTERVAL_ACTIVITIES_LOADING':
      return {
        ...state,
        activitiesIntervalLoading: true,
      }
    case 'CLEAR_INTERVAL_ACTIVITIES_LOADING':
      return {
        ...state,
        activitiesIntervalLoading: false,
      }
    default:
      return state
  }
}

export default CaloriefyDbReducer
