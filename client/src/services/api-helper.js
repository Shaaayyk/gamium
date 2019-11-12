import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})


export const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/auth/login', loginData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    localStorage.setItem('authToken', resp.data.token);
    return resp.data.user
  } catch (e) {
    return { error: "invalid credentials" }
  }
}

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/auth/register', registerData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    localStorage.setItem('authToken', resp.data.token);
    return resp.data.user
  } catch (e) {
    return { error: "invalid credentials" }
  }
}

export const verifyUser = async () => {
  const token = localStorage.authToken;
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify')
    return resp.data
  }
  return false
}

export const getAllGames = async () => {
  const resp = await api.get('/games')
  return resp.data
}

export const getOneGame = async (gameId) => {
  const resp = await api.get(`/games/${gameId}`)
  return resp.data
}

export const getUserGames = async (userId) => {
  const resp = await api.get(`/users/${userId}/games`)
  return resp.data
}

export const getUserGame = async (userId, gameId) => {
  const resp = await api.get(`/users/${userId}/games/${gameId}`)
  return resp.data
}

export const postGame = async (userId, gameData) => {
  const resp = await api.post(`/users/${userId}/games`, gameData)
  return resp.data
}

export const putGame = async (gameId, gameData) => {
  const resp = await api.put(`/users/userId/games/${gameId}`, gameData)
  return resp.data
}

export const deleteGame = async (userId, gameId) => {
  const resp = await api.delete(`/users/${userId}/games/${gameId}`)
  return resp.data
}
export const getReviews = async (gameId) => {
  const resp = await api.get(`/games/${gameId}/reviews`)
  return resp.data
}

export const postReview = async (gameId, reviewData) => {
  const resp = await api.post(`/games/${gameId}/reviews`, reviewData)
  console.log(gameId)
  return resp.data
}

export const putReview = async (reviewId, reviewData) => {
  const resp = await api.put(`/games/gameId/review/${reviewId}`, reviewData)
  return resp.data
}

export const deleteReview = async (gameId, reviewId) => {
  const resp = await api.delete(`/games/${gameId}/reviews/${reviewId}`)
  return resp.data
}

export const getOneUser = async (userId) => {
  const resp = await api.get(`/users/${userId}`)
  return resp.data
}
