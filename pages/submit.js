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
		submitCommand: 'Command will appear here',
		start_epoch_select: null,
		end_epoch_select: 1,
		payment_amount: 0,
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(process.env.API_URL, cookieUtils.getToken(ctx))
		return {
			isLoggedIn: client.isLoggedIn(),
			budget: await client.makeRequest('GET', 'core/budget/'),
			submit_date: moment().unix()
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
			return
		}
		this.setState({errorForm1: null})

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

	setFormValue = prop => e => {
		this.setState({ [prop]: e.target.value })
	}

	render() {
		const { isLoggedIn, submit_date, budget } = this.props
		const { start_epoch_select, end_epoch_select, payment_amount } = this.state

		const startOptions = []
		for (let i = 0; i < 6; i++) {
			startOptions.push({
				label: moment(budget.paymentDate).add(i*28, 'days').format("DD MMMM YYYY"),
				value: moment(budget.paymentDate).add(i*28, 'days').unix()
			})
		}

		const endOptions = []
		const paymentsCountMax = 12
		for (let i = 1; i <= paymentsCountMax; i++) {
			endOptions.push(<option key={i} value={i}>{i} times</option>)
		}

		const payment_count = parseInt(end_epoch_select)
		const first_payment_exact = start_epoch_select
		const last_payment_exact = moment(first_payment_exact*1000).add((payment_count-1)*28, 'days').unix()

		const start_epoch = moment(first_payment_exact*1000).subtract(15, 'days').unix()
		const end_epoch = moment(last_payment_exact*1000).add(15, 'days').unix()
		const lastPayment = moment(last_payment_exact*1000).format("DD MMMM YYYY")
		const totalAmount = payment_amount * payment_count

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
						<h2>Introduction</h2>
						<p>There's a few things to keep in mind when doing this:</p>
						<ol>
							<li><b>Don't refresh this page after Step 1</b> or you'll get stuck.</li>
							<li>There is no discussion features here yet, so open a topic in the <a target="_blank" href="https://forum.heliumlabs.org">forum</a> and post that link.</li>
							<li>If you get stuck best place to ask is #budgetproposals channel in Slack or forum.</li>
						</ol>
					</Paper>

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
											<i>(40 char max and no spaces)</i>
										</td>
									</tr>
									<tr>
										<td>
											<label><a target="_blank" href="https://forum.heliumlabs.org">Forum</a> link</label>
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
											<label>First payment</label>
										</td>
										<td>
											<select id="start_epoch_select" onChange={this.setFormValue('start_epoch_select')}>
												<option defaultValue=""></option>
												{startOptions.map((item, i) => {
													return <option key={i} value={item.value}>{item.label}</option>
												})}
											</select>
											<input className="hidden" value={start_epoch} id="start_epoch" readOnly/>
										</td>
									</tr>
									<tr>
										<td>
											<label>Payments count</label>
										</td>
										<td>
											<select id="end_epoch_select" onChange={this.setFormValue('end_epoch_select')}>
												{endOptions}
											</select>
											<input className="hidden" value={end_epoch} id="end_epoch" readOnly/>
										</td>
										<td>
											<i>(In monthly installments)</i>
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
											<input 
												id="payment_amount"
												placeholder="Amount"
												defaultValue={payment_amount}
												onChange={this.setFormValue('payment_amount')}
											/>
										</td>
										<td>
											<i />
										</td>
									</tr>
								</tbody>
							</table>
							{totalAmount ? 
								<p>That is a total of {totalAmount} {process.env.TICKER} with last payment on {lastPayment}.</p>
							: null}
							<input id="type" className="hidden" defaultValue="1" />
							<input id="parenthash" className="hidden" defaultValue="0" />
							<input id="revision" className="hidden" defaultValue="1" />
							<input id="time" className="hidden" defaultValue={submit_date} />
							<input type="submit" />
							<p className="error">{this.state.errorForm1}</p>
							{this.state.prepCommand ?
								<p>Great! Continue to step 2.</p>
							: null}
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
							{this.state.submitCommand ?
								<p>Seems legit. Continue to step 3.</p>
							: null}
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
