var Jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return Jwt.sign({
    _id: user[0].dataValues.id,
    userName: user[0].dataValues.userName,
    userEmail: user[0].dataValues.userEmail,
    isAdmin: user[0].dataValues.isAdmin,
  },
    process.env.JWT_SECRET || 'something',
    {
      expiresIn: '1d',
    });
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};




module.exports = generateToken, isAuth, isAdmin;