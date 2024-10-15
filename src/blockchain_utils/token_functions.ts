import { ethers } from "ethers";
const abi = require("erc-20-abi");

export const withdrawEth = async ({
  json_rpc_provider,
  private_key,
  reciepent,
  amount,
}: {
  json_rpc_provider: string;
  private_key: string;
  reciepent: string;
  amount: string;
}) => {
  const provider = new ethers.JsonRpcProvider(json_rpc_provider);
  const signer = new ethers.Wallet(private_key, provider);

  const tx = {
    to: reciepent,
    value: ethers.parseEther(amount),
  };
  const transaction = await signer.sendTransaction(tx);
  return transaction;
};

export const withdrawToken = async ({
  json_rpc_provider,
  token_address,
  private_key,
  reciepent,
  amount,
}: {
  json_rpc_provider: string;
  token_address: string;
  private_key: string;
  reciepent: string;
  amount: string;
}) => {
  const provider = new ethers.JsonRpcProvider(json_rpc_provider);
  const signer = new ethers.Wallet(private_key, provider);

  const token = new ethers.Contract(token_address, abi, signer);
  const transaction = token.transfer(reciepent, amount);

  return transaction;
};
