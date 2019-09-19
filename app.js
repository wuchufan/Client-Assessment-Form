require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodeMailer = require("nodemailer")
const app = express();


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.route("/")

.get((req,res)=>{
  res.render("main");
});

app.post("/send-email",(req,res)=>{
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS
      }

  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: process.env.AUTH_USER,
      subject: req.body.subject,
      text: req.body.firstName,

      // attachments:[{filename:'Logo.jpg',
      //   path:'./src/Logo.jpg'
      // }]
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.redirect("/");
})


const port = 3000;
app.listen(port,()=>{
  console.log("Server is up at port 3000");
})
