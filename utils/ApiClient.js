export default class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async login(username, password) {
    const { token } = await this.makeRequest('post', 'login', { username, password })
    this.setToken(token)
    return token
  }

  async register(attrs) {
    const user = await this.makeRequest('post', 'users', attrs)
    return user
  }

  async makeRequest(method, endpoint, body) {
    const response = await fetch(`${this.baseUrl}/v0/${endpoint}`, {
      method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      throw new Error(error.message)
    }
  }

  isLoggedIn() {
    return !!this.getToken()
  }

  setToken(token) {
    if (!process.browser) return
    localStorage.setItem('token', token)
  }

  getToken() {
    if (!process.browser) return
    return localStorage.getItem('token')
  }
}