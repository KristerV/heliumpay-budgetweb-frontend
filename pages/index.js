import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'

import config from '../config'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import ProposalPreview from '../components/ProposalPreview'
import Proposal from '../components/Proposal'

export default class Proposals extends React.Component {
	state = {}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, ctx)
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
		if (ctx.query.proposal) {
			const proposalResult = await fetch(
				config.apiUrl + '/v0/core/proposals/' + ctx.query.proposal
			)
			proposal = await proposalResult.json()
			if (proposalResult.status !== 200) {
				errors.push(proposal.message)
				proposal = {}
			}
		}

		return {
			isLoggedIn: client.isLoggedIn(),
			proposals,
			budget,
			proposal,
			errors
		}
	}

	render() {
		const { isLoggedIn, budget, proposals, proposal, errors } = this.props
		const header = (
			<div key="sdf689asdf">
				<p>There are {proposals.length} active proposals (not counting closed).</p>
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
		const column = proposals.map((p, i) => <ProposalPreview data={p} key={i} />)
		column.unshift(header)
		const hasProposal = Object.keys(proposal).length > 0
		const hasErrors = errors.length > 0
		return (
			<LayoutColumns middleColumn={column} isLoggedIn={isLoggedIn}>
				{hasErrors ? (
					<p className="error">
						{errors}
						<style jsx>{`
							.error {
								color: red;
							}
						`}</style>
					</p>
				) : null}
				{hasProposal ? <Proposal proposal={proposal} /> : null}
			</LayoutColumns>
		)
	}
}
