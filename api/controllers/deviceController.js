const ev_device = require('../models').ev_device;
const { Op } = require("sequelize");


module.exports = {
  add(req, res) {
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
  getDeviceStatus(req, res) {
    return ev_device
      .findByPk(req.body.id, {
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

  testfeature(message){
    var testing = message.deviceId;

    return testing
  }
};