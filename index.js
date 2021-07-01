const TelegramBot = require('node-telegram-bot-api')
const helper = require('./helper')
const kb = require('./keyboard_btns')
const keyboard = require('./keyboard')
const TOKEN = '1893020601:AAG-VXv_3YbWMv1bGhu2B5LkElQw35nia4Q'

helper.logStart()

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params:{
            timeout: 10
        }
    }
})

// //main func
bot.on("message", (msg) => {
  console.log("Working", msg.from.first_name);

  switch (msg.text) {
    case kb.home.regularTicket:

        bot.sendInvoice(
            helper.getChatId(msg), 
            'Звичайний квиток',
            'Квиток для отримання запрошення на вечірку',
            'payload',
            '632593626:TEST:sandbox_i75713502648',
            'Random_string_key',
            'UAH',
            [
                {
                    label: 'Звичайний',
                    amount: 35000
                }
            ],
            {
                need_name: true,
                need_phone_number: true,
                need_email: true
            })
      break;

    case kb.home.vipTicket:
        bot.sendInvoice(
            helper.getChatId(msg), 
            'VIP квиток',
            'Квиток для отримання запрошення на вечірку для виняткових гостей',
            'payload',
            '632593626:TEST:sandbox_i75713502648',
            'Random_string_key',
            'UAH',
            [
                {
                    label: 'VIP',
                    amount: 50000
                }
            ],
            {
                need_email: true,
                need_phone_number: true
            })
      break;

    case kb.home.findOnMap:
      bot.sendLocation(msg.chat.id, 49.84385, 24.029743);
      break;
  }
});

bot.onText(/\/start/, msg=>{
    const text = `Вітаю, ${msg.from.first_name}. \n оберіть команду для початку роботи`

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup:{
            keyboard: keyboard.home
        }
    })
})