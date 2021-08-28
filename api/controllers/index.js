const ev_user = require('./userController');
const ev_rfid = require('./rfidController');
const ev_device = require('./deviceController');
const ev_charge = require('./chargeController');

module.exports = {
    ev_user,
    ev_rfid,
    ev_device,
    ev_charge,
};