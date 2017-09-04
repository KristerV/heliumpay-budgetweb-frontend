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
			errorForm1: null,
			prepCommand: null
		}
		this.createPrepareCommand = this.createPrepareCommand.bind(this)
	}

	createPrepareCommand(e) {
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

		let serialized
		try {
			serialized = proposal.serialize()
		} catch(e) {
			this.setState({errorForm1: e.message})
		}
		if (!serialized)
			return

		const prepCmd = `gobject prepare ${form.parenthash.value} ${form.revision.value} ${form.time.value} ${serialized}`
		this.setState({prepCommand: prepCmd})

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
					<h2>Step 1</h2>
					<form onSubmit={this.createPrepareCommand}>
						<input id="name" placeholder="Proposal name (40char)" defaultValue="temp-name-as87gfAFg2O"/>
						<input id="url" placeholder="Description URL" defaultValue ="https://heliumlabs.org/proposal/temp-name-as87gfAFg2O"/>
						<input id="start_epoch" defaultValue={this.props.startepoch} placeholder="Start epoch"/>
						<input id="end_epoch" placeholder="End epoch" defaultValue={this.props.endepoch}/>
						<input id="payment_address" placeholder="Payment Address" defaultValue="yQL9A3NmYgobZ1qx9Ps86LF1qfGHQDAYvU"/>
						<input id="payment_amount" placeholder="Amount" defaultValue="500"/>
						<input id="type" className="hidden" defaultValue="1"/>
						<input id="parenthash" className="hidden" defaultValue="0"/>
						<input id="revision" className="hidden" defaultValue="1"/>
						<input id="time" className="hidden" defaultValue={this.props.startepoch}/>
						<input type="submit"/>
						<p className="error">{this.state.errorForm1}</p>
					</form>
					<h2>Step 2</h2>
					<form>
						<p className="copyBox">{this.state.prepCommand}</p>
						<p>Paste this command into your wallet and bring the resulting transaction ID here. This will pay the 5DASH necessary.</p>
						<input id="txid" placeholder="Prepare command result"/>
						<input type="submit"/>
					</form>
					<h2>Step 3</h2>
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
						.copyBox {
							border: 1px solid rgb(200,200,200);
							background-color: rgb(230,230,230);
							padding: 10px;
							word-break: break-all;
						}
					`}</style>
				</div>
			</Layout>
		)
	}
}