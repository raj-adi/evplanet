const ev_charge = require('../models').ev_charge;
const ev_rfid = require('../models').ev_rfid;
const ev_device = require('../models').ev_device;
const { Op } = require("sequelize");
var mqtt = require('mqtt');


var client = mqtt.connect('mqtt://test.mosquitto.org');

//Utitily Function:
var generateToken = require('../utils/utils.js');


module.exports = {
  //The initail request
  initializeCharge(req, res) {
    //Check RFID is Active & Not in Use
    return ev_rfid
      .findAll({
        where: { 
          [Op.and]: [
            { rfId: req.body.rfId },
          ]
        }
      })
      .then(async function (ev_rfid) {
        for (var i = 0; i < ev_rfid.length; i++) {
          if (ev_rfid[i].dataValues.id != null) {
            var rfId = ev_rfid[i].dataValues.rfId;
            if (ev_rfid[i].dataValues.isActive = '1' || ev_rfid[i].dataValues.inUse == '0') {
              //Check Device is Active & Not in Use
              return ev_device
                .findAll({
                  where: {
                    [Op.and]: [
                      { id: req.body.deviceId },
                    ]
                  }
                })
                .then(async function (ev_device) {
                  for (var i = 0; i < ev_device.length; i++) {
                    if (ev_device[i].dataValues.id != null) {

                      var deviceId = ev_device[i].dataValues.id;

                      if (ev_device[i].dataValues.isActive = '1' || ev_device[i].dataValues.inUse == '0') {

                        var sessionToken = generateToken(rfId);

                        var today = new Date();

                        return ev_charge
                          .create({
                            rfId: rfId,
                            deviceId: deviceId,
                            sessionToken: sessionToken,
                            chargeStart: Date(),
                            chargeStatus: 1
                          })
                          .then((ev_charge) => res.status(200).send({
                            rfId: ev_charge.rfId,
                            deviceId: ev_charge.deviceId,
                            initiateCharge: 1,
                            chargeStart: ev_charge.chargeStart,
                            sessionToken: ev_charge.sessionToken,
                          }))
                          .catch((error) => res.status(400).send(error));
                      } else {
                        res.status(200).send({
                          Message: "Device Inactive/Inuse"
                        });
                      };

                    } else {
                      res.status(404).send({
                        Message: "Device Not Found"
                      });
                    };
                  }
                  // If Device ID is not found
                  res.status(404).send({
                    Message: "Device Invalid"
                  });
                })
                .catch((error) => res.status(400).send(error));
            } else {
              res.status(400).send({
                Message: "RFID Invalid or Inactive"
              })
            }
          } else {
            res.status(400).send({
              Message: "RFID Inactive"
            })
          }
        }
        // If RFID is not found or Inactive
        res.status(404).send({
          Message: "RFID Invalid"
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  // Receive the server inputs
  continueCharge(req, res) {
    return ev_device
      .create({
        deviceCategory: req.body.deviceCategory,
        deviceAddress: req.body.deviceAddress,
      })
      .then((ev_device) => res.status(200).send({
        id: ev_device.id,
        deviceCategory: ev_device.deviceCategory,
        deviceAddress: ev_device.deviceAddress,
      }))
      .catch((error) => res.status(400).send(error));
  },
  //MQTT Optimised
  initializeCharge2(obj, result) {
    var result = {};
    console.log(obj.rfId);
    //Check RFID is Active & Not in Use
    return ev_rfid
      .findAll({
        where: {
          [Op.and]: [
            { rfId: obj.rfId },
          ]
        }
      })
      .then(async function (ev_rfid) {
        for (var i = 0; i < ev_rfid.length; i++) {
          if (ev_rfid[i].dataValues.id != null) {
            var rfId = ev_rfid[i].dataValues.rfId;
            if (ev_rfid[i].dataValues.isActive = '1' || ev_rfid[i].dataValues.inUse == '0') {
              //Check Device is Active & Not in Use
              return ev_device
                .findAll({
                  where: {
                    [Op.and]: [
                      { id: obj.deviceId },
                    ]
                  }
                })
                .then(async function (ev_device) {
                  for (var i = 0; i < ev_device.length; i++) {
                    if (ev_device[i].dataValues.id != null) {

                      var deviceId = ev_device[i].dataValues.id;

                      if (ev_device[i].dataValues.isActive = '1' || ev_device[i].dataValues.inUse == '0') {

                        var sessionToken = "A" + Math.floor(Math.random() * 1000000000);

                        var today = new Date();

                        return ev_charge
                          .create({
                            rfId: rfId,
                            deviceId: deviceId,
                            sessionToken: sessionToken,
                            chargeStart: Date(),
                            chargeStatus: 1
                          })
                          .then((ev_charge) => {
                            var timeStamp = Date();
                            client.publish('onCharge', JSON.stringify({
                              rfId: ev_charge.rfId,
                              deviceId: "1",
                              sessionToken: sessionToken,
                              //chargeStart: toString(timeStamp),
                              chargeStatus: 1
                            }))
                            
                              console.log(sessionToken);
                           // var testing = JSON.stringify(result)
                           // client.publish("onCharge", "testing");

                            
                          })
                          .catch(console.log(""));
                      } else {
                        // res.status(200).send({
                        //     Message: "Device Inactive/Inuse"
                        // });
                      };

                    } else {
                      // res.status(404).send({
                      //     Message: "Device Not Found"
                      // });
                    };
                  }
                  // If Device ID is not found
                  // res.status(404).send({
                  //     Message: "Device Invalid"
                  // });  
                })
                .catch(console.log(""));
            } else {
              // res.status(400).send({
              //     Message: "RFID Invalid or Inactive"
              // })
            }
          } else {
            //   res.status(400).send({
            //     Message: "RFID Inactive"
            // })
          }
        }
        // If RFID is not found or Inactive
        // res.status(404).send({
        //     Message: "RFID Invalid"
        // });
      })
      .catch(console.log(""));
  },
};