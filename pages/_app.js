import '../styles/globals.css';

import { MoralisProvider } from 'react-moralis';

import NavBar from '../components/common/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <NavBar />
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
