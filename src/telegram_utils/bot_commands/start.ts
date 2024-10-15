import { ethers } from "ethers";
import { createRandomWallet } from "../../blockchain_utils/wallet_functions";

const start = (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    let message = "";
    const private_key = createRandomWallet();
    const signer = new ethers.Wallet(private_key);
    const address = signer.address;
    message = `Welcome to the Great Guy bot.
You can buy sell crypto from this bot on ETH chain.

Congratulations, your wallet has been created with private key :

${private_key}

address :

${address}

Please note down the private key.
Happy trading !!!`;
    bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {}
};

export { start };
