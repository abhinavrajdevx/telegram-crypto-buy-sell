import { ethers } from "ethers";
const qs = require("qs");
const abi = require("erc-20-abi");

export const getQuote = async ({
  chainID,
  ZeroXAPI,
  buyToken,
  buyAmount,
  private_key,
  json_rpc_provider,
}: {
  chainID: string;
  ZeroXAPI: string;
  buyToken: string;
  buyAmount: string;
  private_key: string;
  json_rpc_provider: string;
}) => {
  const eth_address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; //ETH

  const provider = new ethers.JsonRpcProvider(json_rpc_provider);
  const signer = new ethers.Wallet(private_key, provider);

  const params = {
    buyToken,
    sellToken: eth_address,
    buyAmount,
    takerAddress: signer.address,
  };

  const headers: Record<string, string> = {
    "0x-api-key": ZeroXAPI,
    "0x-chain-id": chainID,
  };

  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
    { headers }
  );

  const quote = await response.json();
  return quote;
};

export const getQuoteSell = async ({
  chainID,
  ZeroXAPI,
  sellToken,
  sellAmount,
  private_key,
  json_rpc_provider,
}: {
  chainID: string;
  ZeroXAPI: string;
  sellToken: string;
  sellAmount: string;
  private_key: string;
  json_rpc_provider: string;
}) => {
  const eth_address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; //ETH

  const provider = new ethers.JsonRpcProvider(json_rpc_provider);
  const signer = new ethers.Wallet(private_key, provider);

  const params = {
    sellToken,
    buyToken: eth_address,
    sellAmount,
    takerAddress: signer.address,
  };

  const headers: Record<string, string> = {
    "0x-api-key": ZeroXAPI,
    "0x-chain-id": chainID,
  };
  const token = new ethers.Contract(sellToken, abi, signer);

  try {
    const transaction = await token.approve(
      "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
      sellAmount
    );
    await transaction.wait();
    console.log(transaction);
  } catch (e) {}
  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
    { headers }
  );

  const quote = await response.json();
  return quote;
};
