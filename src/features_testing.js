
// // Buttons for choosing the payment method
// bot.on('message', msg =>{
//     const chatID = msg.chat.id
//     bot.sendMessage(chatID, 'Придбати квитки',{
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     {
//                         text: 'Придбати звичайний квиток',
//                         url: 'https://www.liqpay.ua/documentation/api/sandbox',
//                         callback_data: 'repl'
//                     },
//                     {
//                         text: 'Придбати VIP квиток',
//                         url: 'https://www.liqpay.ua/documentation/api/sandbox',
//                         callback_data: 'forward'
//                     }
//                 ]
//             ]
//         }
//     })
// })

// bot.on('callback_query', query=>{
//     // bot.sendMessage(query.message.chat.id, debug(query))
//     bot.answerCallbackQuery(query.id, `x звичайних квитків залишилось`)
// })

// //send event location
// bot.onText(/\/loc/, msg=>{
//     bot.sendLocation(msg.chat.id, 49.843850, 24.029743)
// })


// //payment process
// bot.onText(/\/pay/, msg=>{

//     bot.sendInvoice(
//         helper.getChatId(msg), 
//         'Звичайний квиток',
//         'Квиток звичайний для отримання запрошення на вечірку',
//         'payload',
//         '632593626:TEST:sandbox_i75713502648',
//         'Random_string_key',
//         'UAH',
//         [
//             {
//                 // label: 'ticketSimple',
//                 amount: 35000
//             }
//         ],
//         {
//             need_email: true
//         })
// })


// bot.on('inline_query', msg=>{

//     const results =[]

//     for(let i; i<5; i++){
//         results.push({
//             type: 'article',
//             id: i.toString(),
//             title: 'Title ' + i,
//             input_message_content: `Article #${i+1}`
//         })
//     }

//     bot.answerInlineQuery(query.id, results, {
//         cache_time: 0
//     })
// })

// bot.onText(/\/start/, msg =>{
//     const {id} = msg.chat
//     bot.sendMessage(id, debug(msg))
// })

// bot.onText(/\/help (.+)/, (msg, [source, match]) =>{
//     const {id} = msg.chat

//     bot.sendMessage(id, debug(match))
// })

// bot.on('message', msg =>{
//     const chatId = msg.chat.id

//     if(msg.text === 'Закрити'){

//         bot.sendMessage(chatId, 'Закриваю клавіатуру', {
//             reply_markup:{
//                 remove_keyboard: true
//             }
//         })

//     }else if(msg.text === 'Відповісти'){
//         bot.sendMessage(chatId, 'Відповідаю', {
//             reply_markup:{
//                 force_reply:true
//             }
//         })

//     }else{
//         bot.sendMessage(chatId, 'Keyboard', {
//             reply_markup:{
//                 keyboard: [
//                     [{
//                         text:'Придбати звичайний квиток',
//                         request_location: true,
//                         request_contact: true
//                     }, 
//                     {
//                         text:'Пидбати квиток VIP',
//                         request_location: true
//                         //request_contact:true
//                     }],
//                     ['Відповісти', 'Закрити']
//                 ],
//                 one_time_keyboard:true
//             }
//         })
//     }

// })



// bot.on('message', (msg)=>{
//     const {id} = msg.chat

//     bot.sendMessage(id, debug(msg))
//         .then(() => {
//             console.log('Msg has been sent')
//         })
//         .catch((error) =>{
//             console.error(error)
//         })


//     console.log(id, debug(msg))
// })

