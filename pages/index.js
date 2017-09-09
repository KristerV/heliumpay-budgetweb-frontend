import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Item from '../components/proposalsList/item'
import config from '../config'
import 'isomorphic-fetch'
import 'moment'

import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'

export default class extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	static async getInitialProps () {
		let errors = []

		const proposalsResult = await fetch(config.apiUrl+'/v0/core/proposals?status=active')
		let proposals = await proposalsResult.json()
		if (proposalsResult.status !== 200) {
			errors.push(proposals.message)
			proposals = []
		}

		const budgetResult = await fetch(config.apiUrl+'/v0/core/budget')
		let budget = await budgetResult.json()
		if (budgetResult.status !== 200) {
			errors.push(budget.message)
			budget = {}
		}

		return {
			proposals,
			budget,
			errors
		}
	}

	render () {
		const budget = this.props.budget
		const header = <div>
				<p>There are {this.props.proposals.length} active proposals (not counting closed).</p>
				<p>Next payment will be {Math.round(budget.budgetTotal * 100) / 100} {config.ticker} and it will occur in {Math.round(budget.paymentDelay/60/60/24)} days (however there are only {Math.round(budget.voteDeadlineDelay/60/60/24)} days to vote).</p>
				<p><Link href="/proposal/submit"><a>Create proposal</a></Link></p>
			</div>
		const columns = [
			<ul>
				<li>Üks</li>
				<li>Kaks</li>
				<li>Kolm</li>
			</ul>,
			this.props.proposals.map((p, i) => <Paper key={i}>
					<Item data={p}/>
				</Paper>)
		]
		columns[1].unshift(header)
		return (
			<LayoutColumns columns={columns}>
				<p className="error">{this.props.errors}</p>
				<style jsx>{`
					.error {
						color: red;
					}
				`}</style>
			</LayoutColumns>
		)
	}
}