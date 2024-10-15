import { ethers } from "ethers";
const qs = require("qs");
const abi = require("erc-20-abi");

export const sellToken = async ({
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

  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
    { headers }
  );

  const quote = await response.json();
  // console.log(quote);

  await signer.sendTransaction({
    gasLimit: quote.gas,
    gasPrice: quote.gasPrice,
    to: quote.to,
    data: quote.data,
    value: quote.value,
    chainId: quote.chainId,
  });
};
