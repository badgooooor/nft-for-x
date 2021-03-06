import Image from 'next/image';
import Link from 'next/link';

import Account from './Account';
import MintMockButton from './MintMockButton';
import SwitchButton from './SwitchButton';

const NavBar = () => {
  return (
    <nav className='flex flex-wrap items-center justify-between rounded-md m-4 p-4 bg-white-pink border-2 border-light-pink'>
      <div className='flex items-center mr-6 text-black flex-no-shrink cursor-pointer'>
        <Link href={`/`}>
          <Image src={'/logo/brand-full.png'} alt='full-logo' height={40} width={130} />
        </Link>
      </div>
      <div className='flex flex-row justify-end items-center'>
        <SwitchButton />
        <Account />
      </div>
    </nav>
  );
};

export default NavBar;
