import Link from 'next/link';
import { useRouter } from 'next/router';

const SwitchButton = () => {
  const router = useRouter();

  return (
    <div className='mr-2'>
      {router.pathname !== '/' ? (
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
