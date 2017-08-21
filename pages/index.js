import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Item from '../components/proposalsList/item'
import config from '../config'
import 'isomorphic-fetch'

export default class extends React.Component {
	static async getInitialProps () {
		const res = await fetch(config.apiUrl+'/v0/core/proposals')
		const json = await res.json()
		let items = Object.values(json)
		return {
			proposals: items,
		}
	}

	render () {
		const header = <p>There are {this.props.proposals.length} proposals in total.</p>
		return (
			<Layout header={header}>
				{this.props.proposals.map((p, i) => {
					return <Item key={i} data={p}/>
				})}
			</Layout>
		)
	}
}