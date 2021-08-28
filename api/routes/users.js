var express = require('express');
var router = express.Router();
var expressAsyncHandler = require('express-async-handler');
var bcrypt = require('bcryptjs');


//Utility Functions
var generateToken = require('../utils/utils.js');

//User Model
const models = require('../models');


/* GET users listing. */
router.get('/', function (req, res, next) {
  user.findAll();
  res.send('respond with a resource');
});


// // SignIn User
// router.post ('/signin',
// expressAsyncHandler( async (req, res) => {
//   const user = await User.findOne({ email: req.body.email});
//   if (user) {
//     if(bcrypt.compareSync(req.body.password, user.passsword)){
//       res.send({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: generateToken(user),
//       });
//       return;var {user} = require('../models/userModel');
//     }
//   }
//   res.status(401).send({
//     message: 'Invalid email or password'
//   })
// }));


// // Register User
router.post('/register',
  expressAsyncHandler(async (req, res) => {

    // const data = req.body;
    // const newUser = await User.create(
    //   data
    // );
    console.log(req);
    models.User.create({
      userName: req.body.name,
      userEmail: req.body.email,
      userPassword: bcrypt.hashSync(req.body.password, 8),
    });
    res.json('Registration successful');


    // const user = ({
    //   userName: req.body.name,
    //   userEmail: req.body.email,
    //   userPassword: bcrypt.hashSync(req.body.password, 8),
    // });

    // const createuser = await User.create();
    // res.send({
    //   id: createuser._id,
    //   name: createuser.name,
    //   email: createuser.email,
    //   isAdmin: createuser.isAdmin,
    //   token: generateToken(createuser),
    // })

  }));


module.exports = router;
