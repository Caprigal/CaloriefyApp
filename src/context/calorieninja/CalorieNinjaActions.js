import axios from "axios"

const CALORIENINJA_URL = process.env.REACT_APP_CALORIENINJA_URL
const CALORIENINJA_TOKEN = process.env.REACT_APP_CALORIENINJA_TOKEN

const calorieninja = axios.create({
  baseURL: CALORIENINJA_URL,
  headers: {
    'X-Api-Key': CALORIENINJA_TOKEN,
  },
  contentType: 'application/json',
})

export const fetchNutritions = async (text) => {
  try {
    const response = await calorieninja.get(`/nutrition?query=${text}`)
    return response
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return message
  }
}