const TelegramBot = require("node-telegram-bot-api") 
const helper = require("./helper")   
const kb = require("./keyboard_btns")   
const keyboard = require("./keyboard")   
const mailer = require("./mailer")  
const TOKEN = "1893020601:AAG-VXv_3YbWMv1bGhu2B5LkElQw35nia4Q"   
const mongoose = require('mongoose')  
const DB_URL = `mongodb+srv://Andrew:1NXtDpqEELgBUjY7@cluster0.z6r7y.mongodb.net/ProjectBot?retryWrites=true&w=majority`
const mongo = require('./model/user')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


async function SartDB(){
  try{
    await mongoose.connect(DB_URL)
  }
  catch(err){
    console.log(err)
  }
}



helper.logStart()   



const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
})   


bot.on("message", async (msg) => {
  console.log("Working", msg.from.first_name)   

  switch (msg.text) {
    case kb.home.regularTicket:
      await bot.sendInvoice(
        await helper.getChatId(msg),
        "Звичайний квиток",
        "Квиток для отримання запрошення на вечірку",
        "regular",
        "632593626:TEST:sandbox_i75713502648",
        "Random_string_key",
        "UAH",
        [
          {
            label: "Звичайний",
            amount: 35000,
          },
        ],
        {
          need_name: true,
          need_phone_number: true,
          need_email: true,
        }
      )   
      break   

    case kb.home.vipTicket:
      await bot.sendInvoice(
        await helper.getChatId(msg),
        "VIP квиток",
        "Квиток для отримання запрошення на вечірку для виняткових гостей",
        "vip",
        "632593626:TEST:sandbox_i75713502648",
        "Random_string_key",
        "UAH",
        [
          {
            label: "VIP",
            amount: 50000,
          },
        ],
        {
          need_email: true,
          need_phone_number: true,
        }
      )   
      break   

    case kb.home.findOnMap:
      await bot.sendLocation(msg.chat.id, 49.84385, 24.029743)   
      break   
  }
})   

bot.on("pre_checkout_query", async (msg) => {
  await bot.answerPreCheckoutQuery(msg.id, true)  
})   

bot.on("successful_payment", async (msg) => {
  const reg = "regular"   
  const vip = "vip"   

  console.log(msg)   
  console.log("Paid sucessfully")   

  
  let userElement = new mongo.models.userPayment({
    first_name: msg.from.first_name,
    username: msg.from.username,
    date: msg.date,
    total_amount: msg.successful_payment.total_amount,
    invoice_payload: msg.successful_payment.invoice_payload,
    phone_number: msg.successful_payment.phone_number,
    email: msg.successful_payment.email
  })
  
  await userElement.save()


  switch (msg.successful_payment.invoice_payload) {
    case reg:
      await bot.sendSticker(
        await helper.getChatId(msg),
        "CAACAgIAAxkBAAELCJZg3h5hOcxTbVgmi1kzetX7fXwm6AAC1QADlp-MDtnJFaLyNwN9IAQ"
      )
  
      await mailer.sendMail(msg.successful_payment.order_info.email)   
      await mailer.sendMail("verda.miller12@ethereal.email")  // to check inbox check the links in terminal output
  
      break   
  
    case vip:
      await bot.sendSticker(
        await helper.getChatId(msg),
        "CAACAgIAAxkBAAELCbhg3saWDcxFF9Udj4odhsLJpo22BwAC4gADlp-MDlwm8XoXIVgYIAQ"
      )   
      await mailer.sendMail(msg.successful_payment.order_info.email)   
      await mailer.sendMail("verda.miller12@ethereal.email")   
  
      break   
  }


})   

bot.onText(/\/start/, async (msg) => {
  const text = `Вітаю, ${msg.from.first_name}. \nОберіть команду для початку роботи`   

  await bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: keyboard.home,
    },
  })   
})   

SartDB()

