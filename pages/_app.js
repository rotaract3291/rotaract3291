import '../styles/globals.css';
import '../styles/react-vertical-timeline.min.css';
import { Account, AccountContext } from "../components/Account";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  	return (
		<Account>
            <Head>
				<title>Rotaract, RI District 3291 ~ Kolkata, South Bengal & Andamans</title>	
				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=UA-206747011-1`}
				/>
				<script
					dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'UA-206747011-1', {
					page_path: window.location.pathname,
					});
				`,
					}}
				/>
			</Head>
			<Component {...pageProps} />
		</Account>
  	);
}

export default MyApp
