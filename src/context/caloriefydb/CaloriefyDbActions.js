import axios from 'axios'

const CALORIEFY_LAMBDA_URL = process.env.REACT_APP_LAMBDA_URL

const caloriefyLambda = axios.create({
  baseURL: CALORIEFY_LAMBDA_URL,
})

const headerConfig = () => {
  if (!JSON.parse(localStorage.getItem('user'))){
    throw new Error('You have to Sign in for this feature!')
  }

  let token = JSON.parse(localStorage.getItem('user')).token

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } 
}

export const setNewUser = async (User) => {
  try {
    const response = await caloriefyLambda.post(`/createUser`, JSON.stringify(User))
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const loginUser = async (User) => {
  try {
    const response = await caloriefyLambda.post(`/loginUser`, JSON.stringify(User))
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const setDailyIntakes = async (Nutrition) => {
  try {
    const response = await caloriefyLambda.post(`/createIntake`, JSON.stringify(Nutrition), headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getDailyIntakes = async (date) => {
  try {
    const response = await caloriefyLambda.get(`/getDailyIntakes?date=${date.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntervalIntakes = async (datefrom, dateto) => {
  try {
    const response = await caloriefyLambda.get(`/getIntervalIntakes?from=${datefrom.toISOString()}&to=${dateto.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const deleteIntake = async (id) => {
  try {
    const response = await caloriefyLambda.delete(`/deleteIntake?id=${id}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntakes = async () => {
  try {
    const response = await caloriefyLambda.get(`/getIntakes`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntakesHistory = async () => {
  try {
    const response = await caloriefyLambda.get(`/getIntakeHistory`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const setDailyActivities = async (Activity) => {
  try {
    const response = await caloriefyLambda.post(`/createActivity`, JSON.stringify(Activity), headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getDailyActivities = async (date) => {
  try {
    const response = await caloriefyLambda.get(`/getDailyActivities?date=${date.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntervalActivities = async (datefrom, dateto) => {
  try {
    const response = await caloriefyLambda.get(`/getIntervalActivities?from=${datefrom.toISOString()}&to=${dateto.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const deleteActivity = async (id) => {
  try {
    const response = await caloriefyLambda.delete(`/deleteActivity?id=${id}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getActivities = async () => {
  try {
    const response = await caloriefyLambda.get(`/getActivities`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getActivityHistory = async () => {
  try {
    const response = await caloriefyLambda.get(`/getActivityHistory`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getHome = async () => {
  try {
    const response = await caloriefyLambda.get(`/getHome`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}