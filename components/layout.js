import React from 'react'
import Link from 'next/link'

export default (props) => (
	<div className="container">
		<div className="inside">
			{props.children}
		</div>
		<style jsx>{`
			.container {
				width: 100%;
				position: relative;
				text-align: center;
			}
			.inside {
				text-align: left;
				display: inline-block;
				max-width: 900px;
				min-width: 70%;
				border: 1px solid rgba(0,0,0,0.3);
				border-radius: 5px;
				padding: 1em;
			}
		`}</style>
	</div>
)