import React from 'react'
import Link from 'next/link'

export default class extends React.Component {

	render () {
		const data = this.props.data
		const proposal = JSON.parse(data.DataString)[0][1]
		return (
			<div className="item" id={data.Hash}>
				<p><b>Name</b>: {proposal.name}</p>
				<p><b>Start date</b>: {proposal.start_epoch}</p>
				<p><b>Amount</b>: {proposal.payment_amount} DASH</p>
				<p><b>Discussion</b>: {proposal.url}</p>
				<p><b>Absolute yes count</b>: {data.AbsoluteYesCount} (+{data.YesCount} -{data.NoCount} .{this.props.data.AbstainCount})</p>
				<style jsx>{`
					.item {
						border-bottom: 1px solid rgba(0,0,0,0.3);
					}
					.hidden {
						display: none;
					}
				`}</style>
			</div>
		)
	}
}