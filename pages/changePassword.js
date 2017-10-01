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

export default class Login extends React.Component {
	state = {
		isFetching: false,
		password: '',
		confirmPassword: ''
	}

	static async getInitialProps(ctx) {
		const { userId, token } = ctx.query
		const client = new ApiClient(config.apiUrl, cookieUtils.getToken(ctx))
		return {
			isLoggedIn: client.isLoggedIn(),
			userId,
			token
		}
	}

	setFormValue = prop => e => {
		this.setState({ [prop]: e.target.value })
	}

	resetPassword = async e => {
		e.preventDefault()
		const { userId, token } = this.props
		const { password, confirmPassword } = this.state
		this.setState({ error: null, isFetching: true })

		if (password !== confirmPassword) {
			this.setState({ error: 'passwords do not match', isFetching: false })
		} else {
			try {
				const client = new ApiClient(config.apiUrl, token)
				const user = await client.resetPassword(userId, password)
				const userToken = await client.login(user.username, password)
				cookieUtils.setToken(userToken)
				router.push('/')
			} catch (error) {
				this.setState({ error: error.message, isFetching: false })
			}
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { password, confirmPassword, error, isFetching } = this.state

		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<div className="item">
					<h1>Reset Password</h1>
					<Paper>
						<form onSubmit={this.resetPassword}>
							<table>
								<tbody>
									<tr>
										<td>
											<label>New password</label>
										</td>
										<td>
											<input
												type="password"
												value={password}
												onChange={this.setFormValue('password')}
											/>
										</td>
										<td />
									</tr>
									<tr>
										<td>
											<label>Confirm password</label>
										</td>
										<td>
											<input
												type="password"
												value={confirmPassword}
												onChange={this.setFormValue('confirmPassword')}
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<br />
							{error && <Alert>{error}</Alert>}
							<button type="submit" disabled={isFetching}>
								{isFetching ? 'Updating...' : 'Update Password'}
							</button>
							<Link href="/login" prefetch>
								<button>Cancel</button>
							</Link>
							{error && (
								<small>
									<br />
									<br />
									Having problems?&nbsp;
									<Link href="/forgotPassword" prefetch>
										<a>Send password reset link</a>
									</Link>
								</small>
							)}
							<br />
						</form>
					</Paper>
				</div>
			</LayoutColumns>
		)
	}
}
