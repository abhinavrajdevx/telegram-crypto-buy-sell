const axios = require("axios");
import { getBalance } from "../../blockchain_utils/wallet_functions";
import { buyToken } from "../../blockchain_utils/buy_token";
import { getQuote } from "../../blockchain_utils/getQuote";

import { JSON_RPC_ETH_PROVIDER, tokens_list, ZeroXAPI } from "../../lib/var";
import { ethers } from "ethers";

const buy = async (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    let message = "Baught successfully";

    const buy_info = {
      chainID: "1",
      ZeroXAPI,
      //@ts-ignore
      buyToken: tokens_list[ctx.text.split(" ")[1]].address,
      //@ts-ignore
      buyAmount: (
        Number(ctx.text.split(" ")[2]) *
        //@ts-ignore
        tokens_list[ctx.text.split(" ")[1]].decimals
      ).toString(),
      private_key: ctx.text.split(" ")[3],
      json_rpc_provider: JSON_RPC_ETH_PROVIDER,
    };

    const quote: { code: number; reason: string } = await getQuote(buy_info);

    if (quote.code == 109) {
      message = quote.reason;
      return bot.telegram.sendMessage(ctx.chat.id, message, {});
    }

    const res = await buyToken(buy_info);

    const chat_id = ctx.chat.id;
    console.log("Chat id :", chat_id);
    bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {
    console.log(e);
  }
};

export { buy };
