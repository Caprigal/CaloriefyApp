import { getConfig } from '@testing-library/react'
import axios from 'axios'

const CALORIEFY_DB_URL = process.env.REACT_APP_CALORIEFY_DB_URL

const caloriefyDb = axios.create({
  baseURL: CALORIEFY_DB_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    const response = await caloriefyDb.post(`/api/users`, User)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const loginUser = async (User) => {
  try {
    const response = await caloriefyDb.post(`/api/users/login`, User)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const setDailyIntakes = async (Nutrition) => {
  try {
    const response = await caloriefyDb.post(`/api/intakes`, Nutrition, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getDailyIntakes = async (date) => {
  try {
    const response = await caloriefyDb.get(`/api/intakes/${date.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntervalIntakes = async (datefrom, dateto) => {
  try {
    const response = await caloriefyDb.get(`/api/intakes/${datefrom.toISOString()}/${dateto.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const deleteIntake = async (id) => {
  try {
    const response = await caloriefyDb.delete(`/api/intakes/${id}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntakes = async () => {
  try {
    const response = await caloriefyDb.get(`/api/intakes`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntakesHistory = async () => {
  try {
    const response = await caloriefyDb.get(`/api/intakes/history`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const setDailyActivities = async (Activity) => {
  try {
    const response = await caloriefyDb.post(`/api/activities`, Activity, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getDailyActivities = async (date) => {
  try {
    const response = await caloriefyDb.get(`/api/activities/${date.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getIntervalActivities = async (datefrom, dateto) => {
  try {
    const response = await caloriefyDb.get(`/api/activities/${datefrom.toISOString()}/${dateto.toISOString()}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const deleteActivity = async (id) => {
  try {
    const response = await caloriefyDb.delete(`/api/activities/${id}`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getActivities = async () => {
  try {
    const response = await caloriefyDb.get(`/api/activities`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}

export const getActivityHistory = async () => {
  try {
    const response = await caloriefyDb.get(`/api/activities/history`, headerConfig())
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}
