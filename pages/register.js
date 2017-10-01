import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import queryString from 'query-string'
import config from '../config'
import * as cookieUtils from '../utils/cookieUtils'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'
import Alert from '../components/Alert'

const client = new ApiClient(config.apiUrl)

export default class Register extends React.Component {
	state = {
		isFetching: false,
		username: '',
		password: '',
		confirmPassword: '',
		email: ''
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, cookieUtils.getToken(ctx))
		return {
			isLoggedIn: client.isLoggedIn(),
			query: ctx.query
		}
	}

	setFormValue = prop => e => {
		this.setState({ [prop]: e.target.value })
	}

	register = async e => {
		e.preventDefault()
		const { password, confirmPassword, email } = this.state
		const username = this.state.username || this.props.query.username || ''

		this.setState({ error: null, isFetching: true })

		if (password !== confirmPassword) {
			this.setState({ error: 'passwords do not match', isFetching: false })
		} else {
			try {
				await client.register({ username: username, password, email })
				const token = await client.login(username, password)
				cookieUtils.setToken(token)
				router.push('/')
			} catch (error) {
				this.setState({ error: error.message, isFetching: false })
			}
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { password, confirmPassword, email, error, isFetching } = this.state
		const username = this.state.username || this.props.query.username || ''

		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<div className="item">
					<h1>Create an account</h1>
					<Paper>
						<form onSubmit={this.register}>
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
										<td>
											<i>
												(min 3 characters, only letters, numbers and
												underscores, starts with a letter)
											</i>
										</td>
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
											<i>(min 12 characters)</i>
										</td>
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
										<td>
											<i>(optional)</i>
										</td>
									</tr>
								</tbody>
							</table>
							<br />
							{error && <Alert>{error}</Alert>}
							<button type="submit" disabled={isFetching}>
								{isFetching ? 'Registering...' : 'Register'}
							</button>
							<br />
						</form>
						<br />
						<small>
							Already have an account?&nbsp;
							<Link href="/login" prefetch>
								<a>Login</a>
							</Link>
						</small>
					</Paper>
				</div>
			</LayoutColumns>
		)
	}
}
