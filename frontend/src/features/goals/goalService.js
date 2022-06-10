import axios from 'axios'

const API_URL = '/api/goals/'

// create goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, goalData, config)

  return response.data
}

// get goal
const getGoal = async goalData => {
  const response = await axios.get(API_URL, goalData)

  return response.data
}

const goalService = {
  createGoal,
  getGoal,
}

export default goalService
