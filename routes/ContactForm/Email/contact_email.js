const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = (email, message )=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.PORT_EMAIL,
            pass:process.env.GPASS
        }
     });
    
     let mailOption = {
         from:process.env.MY_GMAIL,
         to:email,
         subject:'Test',
         text:message,
     }
    
     transporter.sendMail(mailOption,(err,data)=>{
         if(err){
             console.log(err,"Error")
         }
         else{
             console.log("Successfully send email")
         }
     })
}

 exports.sendEmail = sendEmail