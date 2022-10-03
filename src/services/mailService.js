const sgMail = require('@sendgrid/mail') 

module.exports = class mailService {
    constructor(to, subject, text = '', html = '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        this.msg = {
            to: to, // Change to your recipient
            from: process.env.MY_EMAIL, // Change to your verified sender
            subject: subject,
            text: text,
            html: html
        }
    }

    async sendMail() {
        sgMail
            .send(this.msg)
            .then(() => {
                return true
            })
            .catch((error) => {
                throw new Error(error)
            })
    }
}