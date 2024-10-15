import {
  withdrawEth,
  withdrawToken,
} from "../../blockchain_utils/token_functions";
import { JSON_RPC_ETH_PROVIDER, tokens_list, ZeroXAPI } from "../../lib/var";

const axios = require("axios");

// Index = 0 : /withdraw
//         1 : tokne_name
//         2 : quantity
//         3 : reciepent
//         4 : private_key

const withdraw = async (
  ctx: { text: string; chat: { id: string } },
  bot: any
) => {
  try {
    let message = "Withdraw Success";

    // If user requests to withdraw ETh
    if (ctx.text.split(" ")[1] == "ETH") {
      const trx = await withdrawEth({
        json_rpc_provider: JSON_RPC_ETH_PROVIDER,
        amount: ctx.text.split(" ")[2],
        reciepent: ctx.text.split(" ")[3],
        private_key: ctx.text.split(" ")[4],
      });
      return bot.telegram.sendMessage(ctx.chat.id, message, {});

      // If an ERC20 token
    } else {
      const amount =
        //@ts-ignore
        tokens_list[ctx.text.split(" ")[1]].decimals * ctx.text.split(" ")[2];

      //@ts-ignore

      const trx = await withdrawToken({
        json_rpc_provider: JSON_RPC_ETH_PROVIDER,
        token_address:
          //@ts-ignore
          tokens_list[ctx.text.split(" ")[1]].address.toString(),
        amount: amount.toString(),
        reciepent: ctx.text.split(" ")[3],
        private_key: ctx.text.split(" ")[4],
      });
      return bot.telegram.sendMessage(ctx.chat.id, message, {});
    }
  } catch (e) {
    console.log(e);
  }

  return bot.telegram.sendMessage(ctx.chat.id, "An error occured", {});
};

export { withdraw };
