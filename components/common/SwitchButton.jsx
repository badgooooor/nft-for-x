import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SwitchButton = () => {
  const router = useRouter();
  const [pathName, setPathName] = useState();

  useEffect(() => {
    setPathName(router.pathname);
  }, [router.pathname]);

  return (
    <div className='mr-2'>
      {pathName !== '/' ? (
        <button className='ease-in duration-300 bg-blue-500 hover:bg-white text-white text-sm hover:text-blue-500 border-2 border-blue-500 rounded-md px-4 py-2'>
          <Link href={`/`}>Switch to redeemer</Link>
        </button>
      ) : (
        <button className='ease-in duration-300 bg-blue-500 hover:bg-white text-white text-sm hover:text-blue-500 border-2 border-blue-500 rounded-md px-4 py-2'>
          <Link href={`/campaign`}>Switch to Artist</Link>
        </button>
      )}
    </div>
  );
};

export default SwitchButton;
