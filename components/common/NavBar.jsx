import Image from 'next/image';
import Account from './Account';

const NavBar = () => {
  return (
    <nav className='flex flex-wrap items-center justify-between rounded-md m-4 p-4 bg-white-pink border-2 border-light-pink'>
      <div className='flex items-center mr-6 text-black flex-no-shrink'>
        <Image src={'/logo/brand-full.png'} alt='full-logo' height={40} width={130} />
      </div>
      <div className='flex items-end'>
        <Account />
      </div>
    </nav>
  );
};

export default NavBar;
