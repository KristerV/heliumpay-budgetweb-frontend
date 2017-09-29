import Link from 'next/link'

export default props => (
	<div className="container">
		<ul>
			<li>
				<Link href="/" prefetch>
					<a>Proposals</a>
				</Link>
			</li>
			<li>
				<Link href="/submit" prefetch>
					<a>Create proposal</a>
				</Link>
			</li>
		</ul>
		<style jsx>{`
			.container {
			}
			ul {
				list-style-type: none;
				padding: 0 2.5em 0 1.5em;
				color: rgba(0, 0, 0, 0.7);
			}
			li {
				line-height: 2em;
				font-size: 1.1em;
			}
			a {
				text-transform: capitalize;
				color: inherit;
				text-decoration: inherit;
				white-space: nowrap;
			}
		`}</style>
	</div>
)
