import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'
import config from '../config'
import ApiClient from '../utils/ApiClient'
import * as cookieUtils from '../utils/cookieUtils'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'
import Alert from '../components/Alert'

const client = new ApiClient(config.apiUrl)

export default class ForgotPassword extends React.Component {
	state = {
		email: '',
		isFetching: false,
		hasSent: false
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, cookieUtils.getToken(ctx))
		return {
			isLoggedIn: client.isLoggedIn()
		}
	}

	setFormValue = prop => e => {
		this.setState({ [prop]: e.target.value })
	}

	sendPasswordResetEmail = async e => {
		e.preventDefault()
		const { email } = this.state
		this.setState({ error: null, isFetching: true, hasSent: false })

		try {
			await client.sendPasswordResetEmail(email)
			this.setState({ isFetching: false, hasSent: true })
		} catch (error) {
			this.setState({ error: error.message, isFetching: false })
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { email, error, isFetching, hasSent } = this.state

		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<div className="item">
					<h1>Reset Password</h1>
					<Paper>
						<form onSubmit={this.sendPasswordResetEmail}>
							<table>
								<tbody>
									<tr>
										<td>
											<label>Email</label>
										</td>
										<td>
											<input
												type="email"
												value={email}
												onChange={this.setFormValue('email')}
											/>
										</td>
										<td />
									</tr>
								</tbody>
							</table>
							<br />
							{error && <Alert>{error}</Alert>}
							{hasSent ? (
								<button type="submit">
									{isFetching ? 'Sending...' : 'Resend Link'}
								</button>
							) : (
									<button type="submit">
										{isFetching ? 'Sending...' : 'Send Link'}
									</button>
								)}
							<Link href="/login" prefetch>
								<button>Cancel</button>
							</Link>
						</form>
					</Paper>
				</div>
			</LayoutColumns>
		)
	}
}
