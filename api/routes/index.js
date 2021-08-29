var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');


var client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
  console.log("connected MQTT");
  client.subscribe('initCharge');
  client.subscribe('onCharge');
  client.subscribe('continueCharge');
  client.subscribe('stopCharge');
});

// client.on("error", function (error){ 
//   console.log("Can't connect"+error) 
// });



// Import All Controllers
const userController = require('../controllers').ev_user;
const deviceController = require('../controllers').ev_device;
const rfidController = require('../controllers').ev_rfid;
const chargeController = require('../controllers').ev_charge;



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Users Router */
router.get('/api/users', userController.get);
router.post('/api/users/signin',userController.signin);
router.post('/api/users/add', userController.add);

// RFID Router
router.get('/api/rfid', rfidController.get);
router.post('/api/rfid/add', rfidController.add);
router.post('/api/rfidstatus', rfidController.getRfidStatus);


// Device Router
router.get('/api/device', deviceController.get);
router.post('/api/device/add', deviceController.add);
router.post('/api/device/status', deviceController.getDeviceStatus);

//Charge Router
router.post('/api/intiatecharge', chargeController.initializeCharge);



client.on('message', function (topic, message, packet) {

  switch (topic) {
    case 'initCharge': {
      return chargeController.initializeCharge2(JSON.parse(message));
    }
    case 'onCharge' :  {
      console.log("On Charge triggered");
    }



    default: {

    }

      if (topic === 'initCharge') {



      }
  }

  // if (temperature && humidity) {
  //    //do database update or print
  //    console.log("----");
  //    console.log("temp: %s", temperature);
  //    console.log("----");
  //    console.log("humidity: %s", humidity);


  //    //reset to undefined for next time
  //    temperature = undefined;
  //    humidity = undefined;
  // }
});

// client.on('message', function (topic, message) {
//   // message is Buffer
//  // console.log(message.toString());

//  var message = JSON.parse(message);

//  var rfIdStatus =  rfidController.getRfidStatus(message.rfId);

//  console.log(rfIdStatus);

// //  console.log(obj.deviceId);


// //  var test = deviceController.testfeature(obj);

// //  console.log(test);


// //  var arr = message.toString();
// //  console.log(arr);

// //  console.log(message.time);


//   // if (time == '1351824120'){
//   //   var test = deviceController.getDeviceStatus;

//   //   console.log(test);
//   // }
//   //client.end()
// })







module.exports = router;
