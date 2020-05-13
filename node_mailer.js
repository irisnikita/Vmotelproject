const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nltruongvi@gmail.com',
        pass: 'tjmwjm824594'
    }
})

const mailRegisterSucces = (mailOptions) => {
    const { to = '', subject = '', text = '' } = mailOptions;
    if (to !== '') {
        transporter.sendMail({
            from: 'nltruongvi@gmail.com',
            to,
            subject,
            text
        }, (err, data) => {
            if (err) {
                console.log('Error')
            } else {
                console.log('Email sent')
            }
        })
    }

}

module.exports = { mailRegisterSucces }