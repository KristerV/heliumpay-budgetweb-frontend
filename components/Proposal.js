import React from 'react'
import Link from 'next/link'
import Paper from './Paper'

export default class extends React.Component {

	render () {
		const proposal = this.props.proposal
		if (!proposal || !Object.keys(proposal).length)
			return <div>Selected proposal will display here</div>
		const extraData = JSON.parse(proposal.DataString)[0][1]
		return (
			<Paper>
				<div className="item">
					<p><b>Hash</b>: {proposal.Hash}</p>
					<p><b>FundingResult</b>: {JSON.stringify(proposal.FundingResult)}</p>
					<p><b>start_epoch</b>: {extraData.start_epoch}</p>
					<p><b>end_epoch</b>: {extraData.end_epoch}</p>
					<p><b>name</b>: {extraData.name}</p>
					<p><b>payment_address</b>: {extraData.payment_address}</p>
					<p><b>payment_amount</b>: {extraData.payment_amount}</p>
					<p><b>url</b>: {extraData.url}</p>
					<p><b>Vote yes</b>: gobject vote-many {proposal.Hash} funding yes </p>
					<style jsx>{`
						.item {
							padding: 0 1em;
						}
					`}</style>
				</div>
			</Paper>
		)
	}
}