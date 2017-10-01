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

const client = new ApiClient(config.apiUrl)

export default class Login extends React.Component {
	state = {
		isFetching: false,
		username: '',
		password: ''
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

	setView = view => e => {
		e.preventDefault()
		this.setState({ view })
	}

	login = async e => {
		e.preventDefault()
		const { username, password } = this.state
		this.setState({ error: null, isFetching: true })

		try {
			const token = await client.login(username, password)
			cookieUtils.setToken(token)
			this.setState({ isFetching: false })
			router.push('/')
		} catch (error) {
			this.setState({ error: error.message, isFetching: false })
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { username, password, error, isFetching } = this.state

		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<div className="item">
					<h1>Login</h1>
					<Paper>
						<form onSubmit={this.login}>
							<table>
								<tbody>
									<tr>
										<td>
											<label>Username</label>
										</td>
										<td>
											<input
												value={username}
												onChange={this.setFormValue('username')}
											/>
										</td>
										<td />
									</tr>
									<tr>
										<td>
											<label>Password</label>
										</td>
										<td>
											<input
												type="password"
												value={password}
												onChange={this.setFormValue('password')}
											/>
										</td>
										<td>
											<small>
												<Link href="/forgotPassword" prefetch>
													<a>Forgot?</a>
												</Link>
											</small>
										</td>
									</tr>
								</tbody>
							</table>
							<br />
							{error && <Alert>{error}</Alert>}
							<button type="submit" disabled={isFetching}>
								{isFetching ? 'Logging in...' : 'Login'}
							</button>
							<br />
						</form>
						<br />
						<small>
							Don&apos;t have an account?&nbsp;
							<Link
								href={{
									pathname: '/register',
									query: username ? { username } : {}
								}}
								prefetch
							>
								<a>Register</a>
							</Link>
						</small>
					</Paper>
				</div>
			</LayoutColumns>
		)
	}
}
