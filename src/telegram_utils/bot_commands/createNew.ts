const axios = require("axios");

const createNew = (ctx: { text: string; chat: { id: string } }, bot: any) => {
  try {
    const message = "Create new wallet command";
    const chat_id = ctx.chat.id;
    console.log("Chat id :", chat_id);
    console.log(ctx);
    bot.telegram.sendMessage(ctx.chat.id, message, {});
  } catch (e) {}
};

export { createNew };
