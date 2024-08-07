import { Context, Telegraf } from "telegraf";
import { Handler } from "../Handler";
import type { Update, Message } from "telegraf/types";
import sendTiktoks from "../../Downloders/Tiktok";
export default class Text extends Handler {
  constructor(bot: Telegraf) {
    super(bot)
  }

  handler(): void {
    console.log("Text")
    this.bot.on('text', async (ctx: Context<Update.MessageUpdate<Message.TextMessage>>) => {
      const regexTiktok = /https:\/\/vm.tiktok.com\/[a-zA-Z1-9]+|https:\/\/www.tiktok.com\/@[a-zA-Z1-9_.]+\/video\/[0-9]+|https:\/\/www.tiktok.com\/@[a-zA-Z1-9_.]+\/photo\/[0-9]+/gm;
      let tiktokUrls = ctx.message.text.match(regexTiktok)
      if (tiktokUrls) {
        sendTiktoks(ctx, tiktokUrls)
      }
    })
  }
}
