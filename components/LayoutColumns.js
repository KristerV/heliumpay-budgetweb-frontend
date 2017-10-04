import React from 'react'
import Link from 'next/link'
import DefaultStyle from './DefaultStyle'
import Menu from './Menu'

export default class extends React.Component {
	render() {
		const { isLoggedIn, middleColumn, children } = this.props

		let isChildren = false
		if (children) {
			if (children.hasOwnProperty('props')) isChildren = true
			else {
				children.forEach(c => {
					isChildren = isChildren || !!c
				})
			}
		}
		return (
			<div className="outer">
				<DefaultStyle />
				<div className="inner">
					{isChildren ? (
						<div className="column third">
							{middleColumn ? (
								<Link href="/" prefetch>
									<a className="desktop-hidden">&lt; PROPOSALS</a>
								</Link>
							) : (
								<Link href="/menu" prefetch>
									<a className="desktop-hidden">&lt; MENU</a>
								</Link>
							)}
							{children}
						</div>
					) : null}

					{middleColumn ? (
						<div className="column second">
							<Link href="/menu" prefetch>
								<a className="desktop-hidden">&lt; MENU</a>
							</Link>
							{middleColumn}
						</div>
					) : null}

					<div className="column first">
						<Menu isLoggedIn={isLoggedIn} />
					</div>
				</div>
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
					@media screen and (orientation: portrait), screen and (max-width: 1200px) {
						.inner {
							flex-direction: column;
						}
						.column {
							width: 100% !important;
							max-width: 900px;
							margin: auto;
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
