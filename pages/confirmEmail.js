import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'
import config from '../config'
import * as cookieUtils from '../utils/cookieUtils'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'
import Alert from '../components/Alert'

export default class ConfirmEmail extends React.Component {
	state = {
		email: '',
		resetlinkSent: false
	}

	static async getInitialProps(ctx) {
		const { userId, token, error } = ctx.query
		let client
		// confirm email only when rendering serverside
		if (ctx.res && userId && token) {
			// use the provided token and user id to confirm the users email
			// then redirect to itself without the query parameters
			try {
				client = new ApiClient(config.apiUrl, token)
				const user = await client.confirmEmail(userId)
				ctx.res.redirect('/confirmEmail')
			} catch (err) {
				ctx.res.redirect(`/confirmEmail?error=${err.message}`)
			}
		} else {
			client = new ApiClient(config.apiUrl, cookieUtils.getToken(ctx))
		}

		return {
			isLoggedIn: client.isLoggedIn(),
			error
		}
	}

	render() {
		const { isLoggedIn, error } = this.props
		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<Paper>{error ? <Alert>{error}</Alert> : 'email confirmed'}</Paper>
			</LayoutColumns>
		)
	}
}
