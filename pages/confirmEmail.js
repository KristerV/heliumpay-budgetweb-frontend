import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'
import config from '../config'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'
import Alert from '../components/Alert'

const client = new ApiClient(config.apiUrl)

export default class ConfirmEmail extends React.Component {
	state = {
		email: '',
		resetlinkSent: false
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, ctx)

		if (ctx.res) {
			ctx.res.redirect('/')
		}

		return {}
	}

	render() {
		return null
	}
}
