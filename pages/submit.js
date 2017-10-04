import React from 'react'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'
import * as cookieUtils from '../utils/cookieUtils'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'

export default class Submit extends React.Component {
	state = {
		errorForm1: null,
		prepCommand: 'Command will appear here',
		submitCommand: 'Command will appear here'
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(process.env.API_URL, cookieUtils.getToken(ctx))
		return {
			isLoggedIn: client.isLoggedIn(),
			startepoch: moment().unix(),
			endepoch: moment()
				.add(2, 'months')
				.unix()
		}
	}

	createPrepareCommand = e => {
		e.preventDefault()
		const form = e.target

		const proposal = new Bitcore.GovObject.Proposal()
		proposal.name = form.name.value
		proposal.start_epoch = form.start_epoch.value
		proposal.end_epoch = form.end_epoch.value
		proposal.type = parseInt(form.type.value)
		proposal.url = form.url.value
		proposal.payment_address = form.payment_address.value
		proposal.payment_amount = form.payment_amount.value
		proposal.network = 'testnet'

		proposal.parenthash = form.parenthash.value
		proposal.revision = form.revision.value
		proposal.time = form.time.value

		let dataSerialized
		try {
			dataSerialized = proposal.serialize()
		} catch (e) {
			this.setState({ errorForm1: e.message })
		}
		if (!dataSerialized) return

		const prepCommand = `gobject prepare ${form.parenthash.value} ${form.revision.value} ${form
			.time.value} ${dataSerialized}`
		this.setState({ prepCommand, proposal, dataSerialized })
	}

	createSubmitCommand = e => {
		e.preventDefault()
		const form = e.target
		const proposal = this.state.proposal

		const submitCommand = `gobject submit ${proposal.parenthash} ${proposal.revision} ${proposal.time} ${this
			.state.dataSerialized} ${form.txid.value}`
		this.setState({ submitCommand })
	}

	render() {
		const { isLoggedIn, startepoch, endepoch } = this.props

		return (
			<LayoutColumns isLoggedIn={isLoggedIn}>
				<div className="item">
					<h1>Create a proposal</h1>
					<NoScript>
						<p>
							<b>
								Creating a proposal requires JavaScript. If you don't want to turn
								it on you'll just have to do it manually.
							</b>
						</p>
					</NoScript>

					<Paper>
						<h2>Step 1 - Insert info</h2>
						<form onSubmit={this.createPrepareCommand}>
							<table>
								<tbody>
									<tr>
										<td>
											<label>Proposal title</label>
										</td>
										<td>
											<input id="name" placeholder="Proposal name (40char)" />
										</td>
										<td>
											<i>(40 char max)</i>
										</td>
									</tr>
									<tr>
										<td>
											<label>Link for more info</label>
										</td>
										<td>
											<input id="url" placeholder="Description URL" />
										</td>
										<td>
											<i>(Must include http://)</i>
										</td>
									</tr>
									<tr>
										<td>
											<label>Start datetime</label>
										</td>
										<td>
											<input
												id="start_epoch"
												defaultValue={startepoch}
												placeholder="Start epoch"
											/>
										</td>
										<td>
											<i>(In unix timestamp)</i>
										</td>
									</tr>
									<tr>
										<td>
											<label>End datetime</label>
										</td>
										<td>
											<input
												id="end_epoch"
												placeholder="End epoch"
												defaultValue={endepoch}
											/>
										</td>
										<td>
											<i>(In unix timestamp)</i>
										</td>
									</tr>
									<tr>
										<td>
											<label>Payment address ({process.env.TICKER})</label>
										</td>
										<td>
											<input
												id="payment_address"
												placeholder="Payment Address"
											/>
										</td>
										<td>
											<i />
										</td>
									</tr>
									<tr>
										<td>
											<label>Payment amount ({process.env.TICKER})</label>
										</td>
										<td>
											<input id="payment_amount" placeholder="Amount" />
										</td>
										<td>
											<i />
										</td>
									</tr>
								</tbody>
							</table>
							<input id="type" className="hidden" defaultValue="1" />
							<input id="parenthash" className="hidden" defaultValue="0" />
							<input id="revision" className="hidden" defaultValue="1" />
							<input id="time" className="hidden" defaultValue={startepoch} />
							<input type="submit" />
							<p className="error">{this.state.errorForm1}</p>
						</form>
					</Paper>
					<Paper>
						<h2>Step 2 - pay the fee</h2>
						<form onSubmit={this.createSubmitCommand}>
							<p>
								Paste this command into your wallet debug console. You need to have
								5 {process.env.TICKER} on your account.
							</p>
							<p className="copyBox">{this.state.prepCommand}</p>
							<p>Paste the resulting transaction ID below.</p>
							<input id="txid" placeholder="Prepare command result" />
							<input type="submit" />
						</form>
					</Paper>
					<Paper>
						<h2>Step 3 - submit to network</h2>
						<form>
							<p>
								Now paste this into your wallet. This will submit proposal for
								voting.
							</p>
							<p className="copyBox">{this.state.submitCommand}</p>
							<p>
								You'll need to wait for 6 confirmations before this command will
								work.
							</p>
							<p>
								Submitting will return the proposal ID. You may keep it for
								reference, but don't actually need it.
							</p>
						</form>
					</Paper>
					<style jsx>{`
						.item {
							padding: 0 1em;
						}
						.hidden {
							display: none;
						}
						.error {
							color: red;
						}
						.copyBox {
							border: 1px solid rgb(200, 200, 200);
							background-color: rgb(230, 230, 230);
							padding: 10px;
							word-break: break-all;
						}
						.column {
							width: 45%;
							display: inline-block;
						}
						.column > * {
							height: 35px;
						}
					`}</style>
				</div>
			</LayoutColumns>
		)
	}
}
