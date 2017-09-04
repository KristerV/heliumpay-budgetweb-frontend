import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import config from '../../config'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'

export default class extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			error1: null,
		}
		this.createPrepareCommand = this.createPrepareCommand.bind(this)
	}

	createPrepareCommand(e) {
		e.preventDefault()
		const form = e.target

		const proposal = new Bitcore.GovObject.Proposal()
		proposal.name = form.name
		proposal.start_epoch = form.start_epoch
		proposal.end_epoch = form.end_epoch
		proposal.type = form.type
		proposal.url = form.url
		proposal.payment_address = form.payment_address
		proposal.payment_amount = form.payment_amount

		try {
			const prepCmd = `${config.cliName} prepare ${form.parenthash} ${form.revision} ${form.time} ${proposal.serialize()}`
			console.log(prepCmd)
		} catch(e) {
			this.setState({error1: e.message})
		}

	}

	static async getInitialProps({req}) {
		return {
			startepoch: moment().unix(),
			endepoch: moment().add(2, 'months').unix(),
		}
	}

	render () {
		return (
			<Layout>
				<div className="item">
					<ol>
						<li>Enter information, which will generate the prepare command.</li>
						<li>Paste the command into the wallet console.</li>
						<li>Insert transaction key here and wait 15 min</li>
						<li>Submit proposal command into wallet</li>
						<li>Claim your proposal <i>(not implemented)</i></li>
						<li>Edit additional info <i>(not implemented)</i></li>
					</ol>
					<NoScript><p><b>Creating a proposal requires JavaScript. If you don't want to turn it on you'll just have to do it manually.</b></p></NoScript>
					<form onSubmit={this.createPrepareCommand}>
						<input id="name" placeholder="Proposal name (40char)" defaultValue="temp-name"/>
						<input id="url" placeholder="Description URL" defaultValue ="temp-url"/>
						<input id="start_epoch" defaultValue={this.props.startepoch} placeholder="Start epoch"/>
						<input id="end_epoch" placeholder="End epoch" defaultValue={this.props.endepoch}/>
						<input id="payment_address" placeholder="Payment Address" defaultValue="xxx"/>
						<input id="payment_amount" placeholder="Amount" defaultValue="500"/>
						<input id="type" className="hidden" defaultValue="1"/>
						<input id="parenthash" className="hidden" defaultValue="0"/>
						<input id="revision" className="hidden" defaultValue="1"/>
						<input id="time" className="hidden" defaultValue={this.props.startepoch}/>
						<input type="submit"/>
						<p className="error">{this.state.error1}</p>
					</form>
					<form>
						<input id="preparecmd" disabled placeholder="prepare command"/>
						<p>Paste this command into your wallet and bring the resulting transaction ID here. This will pay the 5DASH necessary.</p>
						<input id="txid" placeholder="Prepare command result"/>
						<input type="submit"/>
					</form>
					<form>
						<input id="submitcmd" disabled placeholder="submit command"/>
						<p>Now paste this into your wallet. This will submit proposal for voting.</p>
					</form>
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
					`}</style>
				</div>
			</Layout>
		)
	}
}