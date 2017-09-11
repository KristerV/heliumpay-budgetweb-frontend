import config from '../config'
import React from 'react'
import Link from 'next/link'
import Paper from './Paper'

export default class extends React.Component {

	render () {
		const proposal = this.props.proposal
		if (!proposal || !Object.keys(proposal).length)
			return <div>Selected proposal will display here</div>
		const extraData = JSON.parse(proposal.DataString)[0][1]
		console.log(proposal, extraData)
		const startDate = (new Date(extraData.start_epoch*1000)).toISOString().slice(0,10)
		const endDate = (new Date(extraData.end_epoch*1000)).toISOString().slice(0,10)
		return (
			<Paper>
				<div className="item">
					<h2>{extraData.name}</h2>
					<div className="inline">
						<h3>{proposal.FundingResult.AbsoluteYesCount} votes</h3>
						<p>Yes: {proposal.FundingResult.YesCount}</p>
						<p>No: {proposal.FundingResult.NoCount}</p>
						<p>Abstain: {proposal.FundingResult.AbstainCount}</p>
					</div>
					<h3>{extraData.payment_amount} {config.ticker}</h3>
					<p>Starting {startDate}</p>
					<a target="_blank" href={extraData.url}>More info</a>
					<p><b>Vote yes</b>: gobject vote-many {proposal.Hash} funding yes </p>
					<style jsx>{`
						.item {
							padding: 0 1em;
						}
						.inline > h1, .inline > h2, .inline > h3, .inline > p {
							display: inline;
							margin-right: 0.7em;
						}
					`}</style>
				</div>
			</Paper>
		)
	}
}