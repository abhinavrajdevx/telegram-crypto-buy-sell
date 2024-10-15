import {
  buy,
  sell,
  withdraw,
  createNew,
  getBalance,
  getBalanceAll,
  getPublicAddress,
  start,
  list,
} from "./bot_commands";

const initializeBotCommandsX = (bot: any) => {
  bot.command("buy", (ctx: any) => {
    buy(ctx, bot);
  });
  bot.command("sell", (ctx: any) => {
    sell(ctx, bot);
  });
  bot.command("with", (ctx: any) => {
    withdraw(ctx, bot);
  });
  bot.command("createNew", (ctx: any) => {
    createNew(ctx, bot);
  });
  bot.command("getPublicAddress", (ctx: any) => {
    getPublicAddress(ctx, bot);
  });
  bot.command("getBalance", (ctx: any) => {
    getBalance(ctx, bot);
  });
  bot.command("getBalanceAll", (ctx: any) => {
    getBalanceAll(ctx, bot);
  });
  bot.command("start", (ctx: any) => {
    start(ctx, bot);
  });

  bot.command("list", (ctx: any) => {
    list(ctx, bot);
  });
};

export { initializeBotCommandsX };
