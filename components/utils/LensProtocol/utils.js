import { ethers } from "ethers";
import omitDeep from "omit-deep";

export const signedTypeData = (domain, types, value) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};
const omit = (object, name) => {
  return omitDeep(object, name);
};

export const formatAddress = (address) => {
  if (!address) {
    return "";
  }
  const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;
  if (address.match(ADDRESS_REGEX)) {
    return `${address.slice(0, 4)}…${address.slice(
      address.length - 4,
      address.length
    )}`;
  }

  return address;
};
