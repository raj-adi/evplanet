const ev_device = require('../models').ev_device;
const { Op } = require("sequelize");


module.exports = {
  get(req, res) {
    return ev_device
      .findAll({
        attributes: [
          'deviceId',
          'deviceCategory',
          'deviceAddress1',
          'deviceAddress2',
          'deviceAddressLandmark',
          'deviceCity',
          'deviceState',
          'deviceCountry',
          'isActive',
          'inUse'
        ]
      })
      .then((ev_device) => res.status(200).send(ev_device))
      .catch((error) => res.status(201).send(error));

  },
  add(req, res) {
    return ev_device
      .create({
        deviceId: "EV" + Math.floor(Math.random() * 10000),
        deviceCategory: req.body.deviceCategory,
        deviceAddress1: req.body.deviceAddress1,
        deviceAddress2: req.body.deviceAddress2,
        deviceAddressLandmark: req.body.deviceAddressLandmark, 
        deviceCity: req.body.deviceCity,
        deviceState: req.body.deviceState,
        deviceCountry: req.body.deviceCountry,
      })
      .then((ev_device) => res.status(200).send({
        deviceId: ev_device.deviceId,
        deviceCategory: ev_device.deviceCategory,
        deviceAddress1: ev_device.deviceAddress1,
        deviceAddress2: ev_device.deviceAddress2,
        deviceAddressLandmark: ev_device.deviceAddressLandmark,
        deviceCity: ev_device.deviceCity,
        deviceState: ev_device.deviceState,
        deviceCountry: ev_device.deviceCountry,
        isActive: ev_device.isActive,
        inUse: ev_device.inUse,
      }))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    const deviceId = req.params.id
    return ev_device
      .update({
        deviceCategory: req.body.deviceCategory,
        deviceAddress1: req.body.deviceAddress1,
        deviceAddress2: req.body.deviceAddress2,
        deviceAddressLandmark: req.body.deviceAddressLandmark,
        deviceCity: req.body.deviceCity,
        deviceState: req.body.deviceState,
        deviceCountry: req.body.deviceCountry,
      }, {
        where: {
          deviceId: deviceId
        }
      })
      .then((ev_device) => res.status(200).send({
        deviceId: ev_device.deviceId,
        deviceCategory: ev_device.deviceCategory,
        deviceAddress1: ev_device.deviceAddress1,
        deviceAddress2: ev_device.deviceAddress2,
        deviceAddressLandmark: ev_device.deviceAddressLandmark,
        deviceCity: ev_device.deviceCity,
        deviceState: ev_device.deviceState,
        deviceCountry: ev_device.deviceCountry,
        isActive: ev_device.isActive,
        inUse: ev_device.inUse,
        message: "Product Sucessfully Updated",
      }))
      .catch((error) => res.status(400).send(error))
  },
  getDeviceStatus(req, res) {
    return ev_device
      .findByPk(req.body.deviceId, {
        where: {
          [Op.and]: [
            { isActive: 1 },
            { inUse: 0 }
          ]
        }
      })
      .then((ev_device) => res.status(200).send({
        id: ev_device.id,
        isActive: ev_device.isActive,
        isLocked: ev_device.inUse,
      }))
      .catch((error) => res.status(400).send(error));
  },


};