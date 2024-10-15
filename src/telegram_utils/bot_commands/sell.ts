const axios = require("axios");
import { getQuoteSell } from "../../blockchain_utils/getQuote";
import { JSON_RPC_ETH_PROVIDER, tokens_list, ZeroXAPI } from "../../lib/var";
import { sellToken } from "../../blockchain_utils/sell_token";

const sell = async (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    let message = "Sold successfully";

    const buy_info = {
      chainID: "1",
      ZeroXAPI,
      //@ts-ignore
      sellToken: tokens_list[ctx.text.split(" ")[1]].address,
      //@ts-ignore
      sellAmount: (
        Number(ctx.text.split(" ")[2]) *
        //@ts-ignore
        tokens_list[ctx.text.split(" ")[1]].decimals
      ).toString(),
      private_key: ctx.text.split(" ")[3],
      json_rpc_provider: JSON_RPC_ETH_PROVIDER,
    };

    const quote: { code: number; reason: string } = await getQuoteSell(
      buy_info
    );
    console.log(quote);
    if (quote.code == 109) {
      message = quote.reason;
      return bot.telegram.sendMessage(ctx.chat.id, message, {});
    }

    const res = await sellToken(buy_info);

    const chat_id = ctx.chat.id;
    console.log("Chat id :", chat_id);

    return bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {
    console.log(e);
  }
  return bot.telegram.sendMessage(ctx.chat.id, "An error occured", {});
};

export { sell };
