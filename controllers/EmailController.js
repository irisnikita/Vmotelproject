const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox174f0660aef14571a2d2a0c92669d273.mailgun.org';
const api_key = 'e9884f3aa5c5704890ea71ff01ae38d0-9a235412-1ef4d91e'
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

const sendMail = (req, res) => {
    const data = {
        from: 'Vmotel <me@samples.mailgun.org>',
        to: 'nltruongvi@gmail.com',
        subject: 'hello world',
        text: 'To say everybody that i have sent this mail to you'
    }
    
    mg.messages().send(data, (err, body) => {
        if(!err){
            console.log(body)
            res.json('Succes send email')
        } else {
            throw err
        }
    })
}

module.exports = {
    sendMail
}