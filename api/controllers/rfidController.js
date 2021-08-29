const ev_rfid = require('../models').ev_rfid;

const { Op } = require("sequelize");

module.exports = {
  get(req,res) {
    return ev_rfid
    .findAll({
      attributes: [
        'rfId', 
        'isActive',
        'inUse'
      ]
    })
    .then((ev_rfid) => res.status(200).send(ev_rfid))
    .catch((error) => res.status(201).send(error));

  },
  add(req, res) {
    return ev_rfid
      .create({
        rfId: req.body.rfid,
      })
      .then((ev_rfid) => res.status(200).send({
        id: ev_rfid.id,
        rfid: ev_rfid.rfId,
      }))
      .catch((error) => res.status(400).send(error));
  },
  getRfidStatus(obj) {
    return ev_rfid
      .findAll({
        where: {
          [Op.and]: [
            { rfId: obj },
          ]
        }
      })
      .then(async function (ev_rfid) {
        for (var i = 0; i < ev_rfid.length; i++) {
          if (ev_rfid[i].dataValues.id != null) {
            var rfId = ev_rfid[i].dataValues.rfId;
            if (ev_rfid[i].dataValues.isActive = '1' || ev_rfid[i].dataValues.inUse == '0') {


            }
          }
        }
        return ev_rfid;
      })
      .catch();

  }
}
