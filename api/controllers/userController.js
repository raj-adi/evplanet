const ev_user = require('../models').ev_user;
const { Op } = require("sequelize");

//Utility Functions
var bcrypt = require('bcryptjs');
var generateToken = require('../utils/utils.js');

module.exports = {
  get(req, res) {
    return ev_user
      .findAll({
        where: {
          [Op.and]: [
            { isAdmin: 0 },
          ]
        },
        attributes: [
          'userName',
          'userEmail',
          'isAdmin',
          'createdAt',
        ]
      })
      .then((ev_user) => res.status(200).send(ev_user))
      .catch((error) => res.status(201).send(error));

  },
  add(req, res) {
    return ev_user
      .create({
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, 8),
      })
      .then((ev_user) => res.status(200).send({
        _id: ev_user.id,
        userName: ev_user.userName,
        userEmail: ev_user.userEmail,
        isAdmin: ev_user.isAdmin,
        token: generateToken(ev_user),
      }))
      .catch((error) => res.status(400).send(error));
  },
  signin(req, res) {
    return ev_user
      .findAll({
        limit: 1,
        where: {
          [Op.and]: [
            { userEmail: req.body.userEmail },
            // { userPassword: bcrypt.compareSync(req.body.userPassword)},
          ]
        }
      })
      .then(async function (ev_user) {
        if (bcrypt.compareSync(req.body.userPassword, ev_user[0].dataValues.userPassword)) {
          console.log(ev_user[0].dataValues.userPassword);
          res.status(200).send({
            _id: ev_user[0].dataValues.id,
            userName: ev_user[0].dataValues.userName,
            userEmail: ev_user[0].dataValues.userEmail,
            isAdmin: ev_user[0].dataValues.isAdmin,
            token: generateToken(ev_user),
          })
        } else {
          res.status(401).send({
            message: "Invalid Email or Password"
          })
        }
      })
      .catch((err) => {
        res.status(401).send({
          message: err
        })
      });
  }
};