import Account from './Account';

const NavBar = () => {
  return (
    <nav className='flex flex-wrap items-center justify-between p-4 bg-[#b2d7df]'>
      <div className='flex items-center mr-6 text-black flex-no-shrink px-6'>
        <a href='/'>
          <span className='font-serif text-3xl font-semibold tracking-tight text-black'>
            NFTForX
          </span>
        </a>
      </div>
      <div className='flex items-end'>
        <Account />
      </div>
    </nav>
  );
};

export default NavBar;
