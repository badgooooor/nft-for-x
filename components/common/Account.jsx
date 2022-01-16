import { useEffect } from "react";
import { useMoralis } from "react-moralis";

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
          className="ease-in duration-300 bg-dark-slate-blue hover:bg-white text-white hover:text-dark-slate-blue border-2 border-dark-slate-blue rounded-md px-4 py-2"
          onClick={() => authenticate()}
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-md px-2 py-2">{`${account.slice(
        0,
        6
      )}...${account.slice(36)}`}</p>
    </div>
  );
}
