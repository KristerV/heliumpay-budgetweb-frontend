import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Item from '../components/proposalsList/item'
import config from '../config'
import 'isomorphic-fetch'
import 'moment'

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
			</div>
		return (
			<Layout header={header}>
				<p className="error">{this.props.errors}</p>
				{this.props.proposals.map((p, i) => {
					return <Item key={i} data={p}/>
				})}
				<style jsx>{`
					.error {
						color: red;
					}
				`}</style>
			</Layout>
		)
	}
}