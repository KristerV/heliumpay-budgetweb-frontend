import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Item from '../components/proposalsList/item'
import 'isomorphic-fetch'

export default class extends React.Component {
	static async getInitialProps () {
		const res = await fetch('http://localhost:3000/v0/core/dash/gobject/list')
		const json = await res.json()
		let items = Object.values(json)
		return {
			proposals: items,
		}
	}

	render () {
		return (
			<Layout>
				<p>There are {this.props.proposals.length} proposals in total.</p>
				{this.props.proposals.map(p => {
					return <Item data={p}/>
				})}
			</Layout>
		)
	}
}