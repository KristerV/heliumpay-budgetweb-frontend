export default class ApiClient {
	constructor(baseUrl, token) {
		this.baseUrl = baseUrl
		this.token = token
	}

	async register(attrs) {
		const user = await this.makeRequest('post', 'users', attrs)
		return user
	}

	async login(username, password) {
		const { token } = await this.makeRequest('post', 'login', { username, password })
		this.token = token
		return token
	}

	async confirmEmail(userId) {
		const user = await this.makeRequest('post', `users/${userId}/confirmEmail`)
		return user
	}

	async sendPasswordResetEmail(email) {
		await this.makeRequest('post', 'login/sendPasswordResetEmail', { email })
	}

	async resetPassword(userId, password) {
		const user = await this.makeRequest('post', `users/${userId}/resetPassword`, { password })
		return user
	}

	async makeRequest(method, endpoint, body) {
		const response = await fetch(`${this.baseUrl}/v0/${endpoint}`, {
			method,
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
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
		// naive implementation as this doesn't check token expiry
		// tokens should be treated as opaque so only the api can know if it's expired
		// we can create an /tokens/verify enpoint or return expiry from /login
		return !!this.token
	}
}
