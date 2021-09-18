var jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authorization = req.body.user.token;
    if (authorization) {
        jwt.verify(
            authorization,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    console.log(err);
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

module.exports = isAuth;