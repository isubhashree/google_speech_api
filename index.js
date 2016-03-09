var express = require('express');
var app = express();
var dotenv =require('dotenv').config({path:'myenv-var.env'}); 
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/Public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "GoogleAPITest.html" );
})

app.get('/sendSMS', function (req, res) {

  client.sendMessage({ 
    to: req.query.to_phone_number, 
    from: req.query.from_phone_number, 
    body: req.query.msg_content, 
  }, function(error, message) { 
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log(error);
        console.log('Oops! There was an error.'+"-"+error.message);
    }
  });
})

app.listen(app.get('port'), function () {
  console.log("Example app listening at", app.get('port'));
})