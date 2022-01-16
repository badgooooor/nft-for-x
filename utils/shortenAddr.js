export const shortenAddr = (address) => {
  if (address && address !== null) {
    return `${address.slice(0, 6)}...${address.slice(36)}`;
  } else {
    return ``;
  }
};
