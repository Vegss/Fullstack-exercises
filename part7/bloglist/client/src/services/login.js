import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {
  const user = {
    username: username,
    password: password
  }
  const request = axios.post(baseUrl, user)

  return request.then(response => response.data)
}

export default { login }