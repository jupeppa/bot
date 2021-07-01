const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "romannawaz01@gmail.com",
        pass: "kheonbxpqklqpaku"
    }
});

module.exports = {
    sendMail: async (email) => {
        let info = await transporter.sendMail({
            to: email,
            from: 'romannawaz01@gmail.com',
            subject: 'Receipt ✔',
            text: 'welcome',
            html: '<b>welcome</b>'
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}