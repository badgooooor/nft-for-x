import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function Account() {
  const { Moralis, isAuthenticated, authenticate, account, logout } = useMoralis();

  useEffect(() => {
    Moralis.onAccountsChanged(function (address) {
      if (isAuthenticated) logout();
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <button
          className='bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-2'
          onClick={() => authenticate()}
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className='text-md px-2 py-2'>{`${account.slice(0, 6)}...${account.slice(36)}`}</p>
    </div>
  );
}
