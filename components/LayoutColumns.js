import React from 'react'

export default class extends React.Component {
	render() {
		return (
			<div className="outer">
				<div className="inner">
					{this.props.columns.map(c => {
						return <div className="column">
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
						width: 40em;
					}
				`}</style>
			</div>
		)
	}
}