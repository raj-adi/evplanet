var Jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return Jwt.sign({
    id: user[0].dataValues.id,
    userName: user[0].dataValues.userName,
    userEmail: user[0].dataValues.userEmail,
    isAdmin: user[0].dataValues.isAdmin,
  },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '1d',
    });
};


module.exports = generateToken;
