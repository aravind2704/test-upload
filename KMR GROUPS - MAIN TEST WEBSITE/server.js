const express = require("express");
const app = express();
const nodemailer = require("nodemailer");


const PORT = process.env.PORT || 8001;
//middleware

app.use(express.static('FINALMAIN'));
app.use(express.json())


app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/FINALMAIN/contact.html')
})
app.post('/',(req, res)=>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'forexample677004@gmail.com',
            pass:'hpfhcefwlzgiwejd'
        }
    })
    var mailOptions={
        from:req.body.email,
        to:'aravinda2702@gmail.com',
        subject: 'RESPONSE Mesaage from Website',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`

      
       
        
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('Error');
        }else{
            console.log('Email sent successfully: '+ info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log("s running")
})