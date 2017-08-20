import React from 'react'
import Link from 'next/link'

export default class extends React.Component {

	render () {
		const data = this.props.data
		const proposal = JSON.parse(data.DataString)[0][1]
		const href = `/proposal?hash=${data.Hash}`
		return (
			<Link href={href}>
				<a>
					<p><b>Name</b>: {proposal.name}</p>
					<p><b>Start date</b>: {proposal.start_epoch}</p>
					<p><b>Amount</b>: {proposal.payment_amount} DASH</p>
					<p><b>Discussion</b>: {proposal.url}</p>
					<p><b>Votes</b>: {data.AbsoluteYesCount} (+{data.YesCount} -{data.NoCount} /{this.props.data.AbstainCount})</p>
					<style jsx>{`
						a {
							width: 100%;
							display: inline-block;
							border-bottom: 1px solid rgba(0,0,0,0.3);
							padding: 0 1em;
							box-sizing: border-box;
							color: inherit;
							text-decoration: inherit;
						}
						a:hover {
							background-color: rgba(100,100,100,0.1);
						}
						.hidden {
							display: none;
						}
					`}</style>
				</a>
			</Link>
		)
	}
}