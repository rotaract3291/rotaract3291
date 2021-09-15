import '../styles/globals.css';
import '../styles/react-vertical-timeline.min.css';
import { Account, AccountContext } from "../components/Account";

function MyApp({ Component, pageProps }) {
  	return (
		<Account>
			<Component {...pageProps} />
		</Account>
  	);
}

export default MyApp
