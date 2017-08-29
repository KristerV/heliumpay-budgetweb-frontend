import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import config from '../../config'

export default class extends React.Component {
	static async getInitialProps (props) {
	}

	render () {
		return (
			<Layout>
				<div className="item">
					<ol>
						<li>Enter information</li>
						<li>Preapare proposal on wallet &lt;-- YOU'RE HERE</li>
						<li>Submit proposal in wallet</li>
						<li>Claim your proposal</li>
						<li>Edit additional info</li>
					</ol>
					<p><i>progress</i></p>
					<p>name</p>
					<p>amount</p>
					<p>start superblock</p>
					<p>superblock count</p>
					<p>payment address</p>
					<p><i>url</i></p>
					<p><i>total amount</i></p>
					<p><i>final payment</i></p>
					<p><i>fee</i></p>
					<style jsx>{`
						.item {
							padding: 0 1em;
						}
					`}</style>
				</div>
			</Layout>
		)
	}
}