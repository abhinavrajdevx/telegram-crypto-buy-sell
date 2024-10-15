import { ethers } from "ethers";

export const createRandomWallet = () => {
  let pvt_key = "";
  const length = 64;
  const characters = "0123456789abcdef";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    pvt_key += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return pvt_key;
};

export const getBalance = async (address: string, RPC_PROVIDER: string) => {
  const provider = new ethers.JsonRpcProvider(RPC_PROVIDER);
  let balance = await provider.getBalance(address);
  //@ts-ignore
  balance = ethers.formatEther(balance);
  return balance;
};
