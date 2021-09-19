var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var isAuth = require('../utils/isAuth.js');
var isAdmin = require('../utils/isAdmin.js');


// Import All Controllers
const userController = require('../controllers').ev_user;
const deviceController = require('../controllers').ev_device;
const rfidController = require('../controllers').ev_rfid;
const chargeController = require('../controllers').ev_charge;



/* GET home page. */
router.post('/', function (req, res, next) {
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
router.post('/api/device', deviceController.get);
router.post('/api/device/add', deviceController.add);
router.put('/api/device/update/:id', deviceController.update);
router.post('/api/device/status', deviceController.getDeviceStatus);

// router.post('/api/device', isAuth, isAdmin, deviceController.get);
// router.post('/api/device/add',isAuth, isAdmin, deviceController.add);
// router.put('/api/device/update/:id',isAuth, isAdmin, deviceController.update);
// router.post('/api/device/status', deviceController.getDeviceStatus);

//Charge Router
router.post('/api/intiatecharge', chargeController.initializeCharge);
router.post('/api/continuecharge', chargeController.continueCharge);


module.exports = router;
