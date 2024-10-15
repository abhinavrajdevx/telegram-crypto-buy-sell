const axios = require("axios");
import { tokens_list_arr } from "../../lib/var";

const list = async (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    let message = "Sold successfully";
    tokens_list_arr.map((item: { symbol: any }) => item.symbol);
    const chat_id = ctx.chat.id;
    console.log("Chat id :", chat_id);

    return bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {
    console.log(e);
  }
  return bot.telegram.sendMessage(ctx.chat.id, "An error occured", {});
};

export { list };
