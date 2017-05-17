var nodemailer     = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thangavel.asahi@gmail.com',
        pass: 'Test@123'
    }
});
module.exports = transporter;