const telegraf = require('telegraf')

const bot = new telegraf('638803907:AAEkXe2bJhZ-mEdVkpoMNJ1NgMBkYUcYH4A')

bot.start((ctx) => ctx.reply('welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker' , (ctx) => ctx.reply('👍'))
bot.hears('hi' , (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i , (ctx) => ctx.reply('Buy-buy'))
bot.startPolling()