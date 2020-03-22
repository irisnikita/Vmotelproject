const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

let sendMaill = (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'nltruongvi@gmail.com',
                clientId: '',
                clientSecret: '',
                refreshToken: ''
            })
        }
    });

    let mainOptions = {
        from: 'trường vĩ nguyễn <nltruongvi@gmail.com>',
        to: 'nguyenluongtruongvi.work@gmail.com',
        subject: 'Mail Xác nhận lại mật khẩu',
        text: 'Xin chào bạn rất vui được làm quen',
    }

    transporter.sendMail(mainOptions, (err, info) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log('Message sent: ',info.response)
        }
    })
}

module.exports = {sendMaill};