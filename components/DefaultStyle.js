import Head from 'next/head'

export default (props) => (
	<div>
		<Head>
			<title>Heliumlabs</title>
			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
		</Head>
		<style>
		{`
			body, html {
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
				background-color: rgb(230,230,230);
			}
			body * {
				font-family: Helvetica, Arial;
			}
		`}</style>
	</div>
)