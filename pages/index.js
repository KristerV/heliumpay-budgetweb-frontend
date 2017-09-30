import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'

import config from '../config'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import ProposalPreview from '../components/ProposalPreview'
import Proposal from '../components/Proposal'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	static async getInitialProps(props) {
		let errors = []

		const proposalsResult = await fetch(config.apiUrl + '/v0/core/proposals?status=active')
		let proposals = await proposalsResult.json()
		if (proposalsResult.status !== 200) {
			errors.push(proposals.message)
			proposals = []
		}

		const budgetResult = await fetch(config.apiUrl + '/v0/core/budget')
		let budget = await budgetResult.json()
		if (budgetResult.status !== 200) {
			errors.push(budget.message)
			budget = {}
		}

		let proposal = {}
		if (props.query.proposal) {
			const proposalResult = await fetch(
				config.apiUrl + '/v0/core/proposals/' + props.query.proposal
			)
			proposal = await proposalResult.json()
			if (proposalResult.status !== 200) {
				errors.push(proposal.message)
				proposal = {}
			}
		}

		return {
			proposals,
			budget,
			proposal,
			errors
		}
	}

	render() {
		const budget = this.props.budget
		const header = (
			<div key="sdf689asdf">
				<p>
					There are {this.props.proposals.length} active proposals (not counting closed).
				</p>
				<p>
					Next payment will be {Math.round(budget.budgetTotal * 100) / 100}{' '}
					{config.ticker} and it will occur in{' '}
					{Math.round(budget.paymentDelay / 60 / 60 / 24)} days (however there are only{' '}
					{Math.round(budget.voteDeadlineDelay / 60 / 60 / 24)} days to vote).
				</p>
				<p>
					To get funded a proposal must get 10% ({Math.round(budget.masternodeCount * 0.1)})
					of absolute 'yes' votes from the total {budget.masternodeCount} nodes. It must
					also fit into the budget.
				</p>
			</div>
		)
		const column = this.props.proposals.map((p, i) => <ProposalPreview data={p} key={i} />)
		column.unshift(header)
		const proposal = Object.keys(this.props.proposal).length ? this.props.proposal : null
		const errors = this.props.errors.length ? this.props.errors : null
		return (
			<LayoutColumns middleColumn={column}>
				{errors ? (
					<p className="error">
						{errors}
						<style jsx>{`
							.error {
								color: red;
							}
						`}</style>
					</p>
				) : null}
				{proposal ? <Proposal proposal={proposal} /> : null}
			</LayoutColumns>
		)
	}
}
