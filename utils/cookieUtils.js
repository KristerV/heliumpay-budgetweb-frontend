const cookie = require('cookie')

export function setToken(token, expires) {
	// only need to support setting a cookie in browser context
	if (typeof document !== 'undefined') {
		document.cookie = cookie.serialize('token', token, { expires })
	}
}

export function getToken(ctx) {
	let token

	if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
		// server context with cookie headeer
		token = cookie.parse(ctx.req.headers.cookie).token
	} else if (typeof document !== 'undefined' && document.cookie) {
		// browser context with document cookie
		token = cookie.parse(document.cookie).token
	}

	return token
}

export function remove() {
	// expires token
	setToken(null, new Date(0))
}
