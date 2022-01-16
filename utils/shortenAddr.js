export const shortenAddr = (address) => {
  return `${address.slice(0, 6)}...${address.slice(36)}`;
};
