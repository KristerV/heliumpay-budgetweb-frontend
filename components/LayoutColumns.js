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

					{isChildren ?
						<div className="column third">
							{this.props.middleColumn ?
								<Link href="/" prefetch><a className="desktop-hidden">&lt; PROPOSALS</a></Link>
								:
								<Link href="/menu" prefetch><a className="desktop-hidden">&lt; MENU</a></Link>
							}
							{this.props.children}
						</div>
					: null}

					{this.props.middleColumn ? 
						<div className="column second">
							<Link href="/menu" prefetch><a className="desktop-hidden">&lt; MENU</a></Link>
							{this.props.middleColumn}
						</div>
					: null}

					<div className="column first">
						<Menu/>
					</div>

				</div>
				<DefaultStyle/>
				<style jsx>{`
					.outer {
						width: 100%;
						height: 100%;
					}
					.inner {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: row;
					}
					.column {
						padding: 1em 0.3em;
						box-sizing: border-box;
					}
					.column.first {
						order: 1;
					}
					.column.second {
						order: 2;
						flex-basis: 50em;
					}
					.column.third {
						order: 3;
						flex-basis: 100%;
					}
					.desktop-hidden {
						display: none;
						color: black;
					}
					@media (max-width: 600px) {
						.inner {
							flex-direction: column;
						}
						.column {
							width: 100% !important;
						}
						.desktop-hidden {
							display: block;
						}
						.column + div {
							display: none;
						}
					}
				`}</style>
			</div>
		)
	}
}