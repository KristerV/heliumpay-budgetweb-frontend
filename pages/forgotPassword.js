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

export default class extends React.Component {
	state = {
		email: '',
		resetlinkSent: false
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, ctx)
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
		this.setState({ error: null, resetlinkSent: false })

		try {
			await client.sendPasswordResetEmail(email)
			this.setState({ resetlinkSent: true })
		} catch (error) {
			this.setState({ error: error.message })
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { email, error } = this.state

		return (
			<LayoutColumns isLoggedIn={isLoggedIn} onLogout={this.logout}>
				<div className="item">
					<h1>Login</h1>
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
							<button type="submit">Send Link</button>
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
