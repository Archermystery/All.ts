import { Telegraf } from "telegraf"
import fs from "fs/promises"
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import { env } from "./env";

async function addHandlers(modulePath: string, bot: Telegraf) {
  const files = await fs.readdir(modulePath);
  console.log(files)
  for (const file of files) {
    const fullPath = path.join(modulePath, file);
    if ((await fs.stat(fullPath)).isDirectory()) {
      await addHandlers(fullPath, bot);
    } else if (file.endsWith('.ts') && !file.endsWith('Handler.ts')) {
      const moduleImport = await import(fullPath);
      const module = moduleImport.default
      if (module) {
        console.log(1)
        const moduleFunc = new module(bot)
        moduleFunc.handler()
      }
    }
  }
}

class Bot {
  bot: Telegraf


  constructor(token: string) {
    this.bot = new Telegraf(token)
  }

  init() {
    const handlerPath = path.join(__dirname, "Handlers")
    addHandlers(handlerPath, this.bot)
    console.log("start")
    this.bot.launch()
  }
}



const bot = new Bot(env.TOKEN)
bot.init()
