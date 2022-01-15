import Head from "next/head";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>NFT for X</title>
        <meta name="description" content="Best NFT Hack Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavBar />
        <div className="mx-4 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
