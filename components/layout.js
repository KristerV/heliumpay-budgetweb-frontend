import React from 'react'
import Link from 'next/link'

export default (props) => (
	<div className="page">
		<div className="layout">
			<div className="header">
				{props.header}
			</div>
			<div className="content">
				{props.children}
			</div>
		</div>
		<style jsx>{`
			.page {
				width: 100%;
				position: relative;
				text-align: center;
			}
			.layout {
				text-align: left;
				display: inline-block;
				max-width: 900px;
				min-width: 70%;
			}
			.content {
				border: 1px solid rgba(0,0,0,0.3);
				border-radius: 5px;
			}
		`}</style>
	</div>
)