import React from 'react'
import Link from 'next/link'
import DefaultStyle from './DefaultStyle'
import Menu from './Menu'

export default class extends React.Component {
	render() {
		let isChildren = false
		if (this.props.children) {
			if (this.props.children.hasOwnProperty("props"))
				isChildren = true
			else {
				this.props.children.forEach(c => {
					isChildren = isChildren || !!c
				})
			}
		}
		return (
			<div className="outer">
				<div className="inner">

					<div className="column">
						<Menu/>
					</div>

					{this.props.middleColumn ? 
						<div className="column">
							{this.props.middleColumn}
						</div>
					: null}

					{isChildren ?
						<div className="column">
							<Link href="/"><a className="back">BACK</a></Link>
							{this.props.children}
						</div>
					: null}

				</div>
				<DefaultStyle/>
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
					.column {
						padding: 1em 0.3em;
					}
					.column:nth-child(2) {
						max-width: 50em;
					}
					.column:nth-child(3) {
						width: 100%;
					}
					.back {
						display: none;
					}
					@media (max-width: 600px) {
						.inner {
							display: block;
						}
						.column {
							width: 100% !important;
							background-color: rgb(230,230,230);
							height: 100%;
						}
						.column:nth-child(3) {
							position: absolute;
							top: 0;
						}
						.back {
							display: block;
						}
					}
				`}</style>
			</div>
		)
	}
}