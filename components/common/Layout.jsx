import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const [isMumbaiShowed, setIsMumbaiShowed] = useState(false);

  useEffect(() => {
    const mumbaiShowed = localStorage.getItem("mumbaiShowed");
    if (mumbaiShowed == "yes") {
      setIsMumbaiShowed(true);
    } else {
      setIsMumbaiShowed(false);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>NFT for X</title>
        <meta name="description" content="Best NFT Hack Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        {!isMumbaiShowed && (
          <div className="flex justify-center">
            <Banner />
          </div>
        )}
        <NavBar />
        <div className="flex justify-center">
          <div className="w-5/6 pt-4 mx-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
