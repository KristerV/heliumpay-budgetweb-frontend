const cookie = require('cookie')

export default class ApiClient {
	constructor(baseUrl, ctx) {
		this.baseUrl = baseUrl
		this.ctx = ctx
	}

	async login(username, password) {
		const { token } = await this.makeRequest('post', 'login', { username, password })
		this.setToken(token)
		return token
	}

	logout() {
		// expires cookie
		this.setToken(null, new Date(0))
	}

	async register(attrs) {
		const user = await this.makeRequest('post', 'users', attrs)
		return user
	}

	async makeRequest(method, endpoint, body) {
		const token = this.getToken()
		const response = await fetch(`${this.baseUrl}/v0/${endpoint}`, {
			method,
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {})
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
		return !!this.getToken()
	}

	setToken(token, expires) {
		this.token = token

		// only neet to support setting a cookie in browser context
		if (typeof document !== 'undefined') {
			document.cookie = cookie.serialize('token', this.token, { expires })
		}
	}

	getToken() {
		// memoize cookie parsing
		if (this.token) return this.token

		if (this.ctx && this.ctx.req && this.ctx.req.headers && this.ctx.req.headers.cookie) {
			// server context
			this.token = cookie.parse(this.ctx.req.headers.cookie).token
		} else if (typeof document !== 'undefined' && document.cookie) {
			// browser context
			this.token = cookie.parse(document.cookie).token
		}

		return this.token
	}
}
