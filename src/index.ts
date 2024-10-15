const { Telegraf } = require("telegraf");
require("dotenv").config();

import { initializeBotCommandsX } from "./telegram_utils/initializeBotCommandsX";
const BOT_TOKEN = "7815772426:AAGKTg-fNyC0l1gbQ49mzvEI5UNLbGx_UN0";
const bot = new Telegraf(BOT_TOKEN);

function main() {
  console.log("BOT STARTED...");
  initializeBotCommandsX(bot);
  bot.launch();
}

main();
