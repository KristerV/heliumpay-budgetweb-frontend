import Link from 'next/link'
import * as cookieUtils from '../utils/cookieUtils'
import features from '../features'

export default ({ isLoggedIn }) => (
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
			{isLoggedIn ? (
				<li>
					{features.login ?
						<Link href="/" prefetch>
							<div>
								<a href="javascript:;" onClick={cookieUtils.remove}>
									Logout
								</a>
							</div>
						</Link>
					: null}
				</li>
			) : (
				<li>
					{features.login ?
						<Link href="/login" prefetch>
							<a>Login / Register</a>
						</Link>
					: null}
				</li>
			)}

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
