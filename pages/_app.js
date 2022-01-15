import "../styles/globals.css";

import { MoralisProvider } from "react-moralis";

import NavBar from "../components/common/NavBar";
import { RecoilRoot } from "recoil";
import Layout from "../components/common/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </MoralisProvider>
  );
}

export default MyApp;
