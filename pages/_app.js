import "../styles/globals.css";

import { MoralisProvider } from "react-moralis";

import NavBar from "../components/common/NavBar";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </MoralisProvider>
  );
}

export default MyApp;
