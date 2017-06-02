var nodemailer     = require('nodemailer');
// create reusable transporter object using the default SMTP transport

//accounts.google.com/DisplayUnlockCaptcha should be turnoff for herokuapp mailer works
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thangavel.asahi@gmail.com',
        pass: 'Test@123'
    }
});
module.exports = transporter;