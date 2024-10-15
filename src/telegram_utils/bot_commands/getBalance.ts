const axios = require("axios");

const getBalance = (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    const message = "Get particular token balance command";
    const chat_id = ctx.chat.id;
    console.log("Chat id :", chat_id);
    console.log(ctx);
    bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {}
};

export { getBalance };
