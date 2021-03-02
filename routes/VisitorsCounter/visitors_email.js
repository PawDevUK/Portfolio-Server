const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = (time, date, counter) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.PORT_EMAIL,
            pass: process.env.GPASS
        }
    });

    let mailOption = {
        from: process.env.MY_GMAIL,
        to: "streetfox85@gmail.com",
        subject: 'Portfolio Visit',
        text: `\nSomeone just entered Portfolio.\nEntry Time: ${time}\nEntry Date: ${date}\nThis is ${counter} entry.
        `,
    }

    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log(err, "Error")
        }
        else {
            console.log("Successfully send email")
        }
    })
}

exports.sendEmail = sendEmail