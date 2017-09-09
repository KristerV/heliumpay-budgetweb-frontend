import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
	render() {
		const columns = this.props.columns || []
		return (
			<div className="outer">
				<div className="inner">
					<div className="column">
						<ul>
							<li><Link href="/"><a>Proposals</a></Link></li>
							<li><Link href="/submit"><a>Create proposal</a></Link></li>
						</ul>
					</div>
					{columns.map((c, i) => {
						return <div className="column" key={i}>
							{c}
						</div>
					})}
					<div className="content">
						{this.props.children}
					</div>
				</div>
				<style jsx>{`
					.outer {
						width: 100%;
						height: 100%;
						background-color: rgb(230,230,230);
					}
					.inner {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: row;
					}
					.content {
						width: 100%;
						padding: 1em 0.3em;
					}
					.column {
						padding: 1em 0.3em;
					}
					.column:first-child {
						min-width: 10em;
					}
					.column:nth-child(2) {
						width: 50em;
					}
				`}</style>
			</div>
		)
	}
}