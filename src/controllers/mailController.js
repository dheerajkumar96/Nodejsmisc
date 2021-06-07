'use strict';

const SENDGRID_API_KEY='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';
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-west-2'});
AWS.config.loadFromPath('config.json');

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

const getobjects = async(req,res) => {
  // Create S3 service object
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//     res.json(data.Buckets);
//   }
// });

var params = {
  Bucket: "dheerajdemo", 
  Key: "pics/Screenshot (40).png"
 };
 s3.getObject(params, function(err, data) {
   if (err) {
     console.log(err, err.stack);} // an error occurred
   else    {

   console.log(data);  
   res.send(data.Body);  
   }       // successful response
   /*
   data = {
    AcceptRanges: "bytes", 
    ContentLength: 3191, 
    ContentType: "image/jpeg", 
    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
    LastModified: <Date Representation>, 
    Metadata: {
    }, 
    TagCount: 2, 
    VersionId: "null"
   }
   */
 });
}
module.exports = {
    sendmail,
    uploadfile,
    getname,
    getobjects
}