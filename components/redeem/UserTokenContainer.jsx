const UserTokenContainer = ({ children }) => {
  return (
    <div className='grid sm:grid-cols-4 grid-cols-2 gap-4 bg-white-pink rounded border-light-pink p-4'>
      {children}
    </div>
  );
};

export default UserTokenContainer;
