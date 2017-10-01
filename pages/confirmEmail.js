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
		const client = new ApiClient(config.apiUrl, cookieUtils.getToken(ctx))
		const { token } = ctx.query

		// make request
		// TODO: confirm email should contain username

		return {
			isLoggedIn: client.isLoggedIn(),
			error: null
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
