var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('ADIHAR1996')
  console.log("here");
});

// client.on("error", function (error){ 
//   console.log("Can't connect"+error) 
// });

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  //client.end()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
