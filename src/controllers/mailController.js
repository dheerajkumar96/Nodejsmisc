'use strict';

const SENDGRID_API_KEY='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';
const sgMail = require('@sendgrid/mail');
const fs = require('fs');

const sendmail = async(req,res) => {
    sgMail.setApiKey(SENDGRID_API_KEY)
const msg = {
  to: 'bdildhiraj@gmail.com', // Change to your recipient
  from: 'dhirajkumar90001@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
    res.json({status: "working"});
  })
  .catch((error) => {
    console.error(error)
  })
}

const uploadfile = async(req,res) => {
console.log('calling upload');
let data = req.body;
let path = '../files/'
const fileContents = new Buffer.from(req.body.filedata, 'base64');
fs.writeFile(path, fileContents, function(error) {
  if (error) {
    console.error("write error:  " + error.message);
    res.json({"error":error.message})
  } else {
    console.log("Successful Write to " + path);
    res.json("success")
  }
});

}

const getname = async(req,res) => {
  console.log('calling');
  res.json({working:"ok"});
}
module.exports = {
    sendmail,
    uploadfile,
    getname
}