const mongoose = require('mongoose')  
const {Schema} = mongoose

const models = {
    userPayment: mongoose.model("userPayment", {
    first_name: String,
    username: String,
    date: Number,
    total_amount: Number,
    invoice_payload: String,
    phone_number: String, 
    email: String
    }) 
}

// const InvoiceModel = mongoose.model('Invoice', userPayment)

module.exports = {
    models: models
}
