const telegramBot = require('node-telegram-bot-api')
const ogs = require('open-graph-scraper')
const firebase = require('firebase')


const token = '638803907:AAEkXe2bJhZ-mEdVkpoMNJ1NgMBkYUcYH4A'
const bot = new telegramBot(token, {polling: true})


bot.on('message' , (msg) => {
 let option = {
     "parse_mode" : "Markdown",
     "reply_markup": {
         "one_time_keyboard": true,
         "keyboard": [[{
             text: "My phone number" , 
             request_contact: true
         }],["Cancel"]]
     }
 }

 bot.sendMessage(msg.chat.id , "How can we contact you ?" , option)
 .then(()=>{
    bot.once("contact" , (msg) => {
        let option = {
             "parse_mode": "Markdown" ,
             "reply_markup": {
                 "one_time_keyboard": [[{
                     text: "My location",
                     request_location: true
                 }], ["Cancel"]]
            }
        }
        bot.sendMessage(msg.chat.id , util.format('Thank you %s with phone%s! And where are you ?' , msg.contact.first_name , msg.contact.phone_number), option)
        .then(() => {
            bot.once("location" , (msg) => {
                bot.sendMessage(msg.chat.id , "We will deliver your order to " + [msg.location.longitude , msg.location.latitude].join(";"))
            })
        })
    })
    
 })

})