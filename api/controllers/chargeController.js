const ev_charge = require('../models').ev_charge;
const ev_rfid = require('../models').ev_rfid;
const ev_device = require('../models').ev_device;
const ev_power_consumption = require('../models').ev_power_consumption;
const { Op } = require("sequelize");


//Utitily Function:
var generateToken = require('../utils/generateToken.js');


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
                      { deviceId: req.body.deviceId },
                    ]
                  }
                })
                .then(async function (ev_device) {
                  for (var i = 0; i < ev_device.length; i++) {
                    if (ev_device[i].dataValues.deviceId != null) {

                      var deviceId = ev_device[i].dataValues.deviceId;

                      if (ev_device[i].dataValues.isActive = '1' || ev_device[i].dataValues.inUse == '0') {

                        //  var sessionToken = generateToken(rfId);
                        var sessionToken = "A" + Math.floor(Math.random() * 1000000000);

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
                          .catch((error) => res.status(400).send({
                            Message: error
                          }));
                      } else {
                        res.status(200).send({
                          Message: "Device Inactive/Inuse"
                        });
                      };

                    } else {
                      res.status(200).send({
                        Message: "Device Not Found"
                      });
                    };
                  }
                  // If Device ID is not found
                  res.status(200).send({
                    Message: "Device Invalid"
                  });
                })
                .catch((error) => res.status(400).send(error));
            } else {
              res.status(200).send({
                Message: "RFID Invalid or Inactive"
              })
            }
          } else {
            res.status(200).send({
              Message: "RFID Inactive"
            })
          }
        }
        // If RFID is not found or Inactive
        res.status(200).send({
          Message: "RFID Invalid"
        });
      })
      .catch((error) => res.status(400).send(error));
  },
  // Receive the server inputs
  continueCharge(req, res) {
    return ev_charge
      .findAll({
        where: {
          [Op.and]: [
            { sessionToken: req.body.sessionToken },
          ]
        }
      })
      .then(async function (ev_charge) {
        for (var i = 0; i < ev_charge.length; i++) {
          if (ev_charge[i].dataValues.chargeStatus == '1') {
            return ev_power_consumption
              .create({
                sessionToken: req.body.sessionToken,
                powerConsumed: req.body.powerConsumed
              })
              .then((ev_power_consumption) => res.status(200).send({
                sessionToken: ev_power_consumption.sessionToken,
                entry: 1
              }))
              .catch((error) => res.status(400).send({
                Message: error
              }));
          } else {
            res.status(400).send(error);
          }
        }
        //Session not found
        res.status(400).send(error);

      })
      .catch((error) => res.status(400).send(error));
  }
};