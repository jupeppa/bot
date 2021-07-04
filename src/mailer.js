const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "verda.miller12@ethereal.email",
        pass: "NDhWXnjG6WksF4TBCe"
    }
});

module.exports = {
    sendMail: async (email) => {
        let info = await transporter.sendMail({
            to: email,
            from: 'verda.miller12@ethereal.email',
            subject: 'Receipt ✔',
            text: 'welcome',
            html: '<b>welcome</b>'
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}