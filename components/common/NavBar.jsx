import Account from './Account';

const NavBar = () => {
  return (
    <nav className='flex flex-wrap items-center justify-between p-4 bg-[#b2d7df]'>
      <div className='flex items-center mr-6 text-black flex-no-shrink'>
        <span className='font-serif text-xl font-semibold tracking-tight text-[#feff79]'>
          NFTForX
        </span>
      </div>
      <div className='flex items-end'>
        <Account />
      </div>
    </nav>
  );
};

export default NavBar;
