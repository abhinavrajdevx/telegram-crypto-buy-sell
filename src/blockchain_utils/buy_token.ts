import { ethers } from "ethers";
const qs = require("qs");

export const buyToken = async ({
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
