import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { shortenAddr } from "../../utils/shortenAddr";

export default function Account() {
  const { Moralis, isAuthenticated, authenticate, account, logout } =
    useMoralis();

  useEffect(() => {
    Moralis.onAccountsChanged(function (address) {
      if (isAuthenticated) logout();
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <button
          className="ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-8 py-2"
          onClick={() => authenticate()}
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-full bg-light-blue px-2 text-md px-2 py-2">
        User: {`${shortenAddr(account)}`}
      </div>
    </div>
  );
}
