const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//WHAT I MADE
// const validateSignup = [
//   check('email')
//     .exists({ checkFalsy: true })
//     .withMessage('Invalid Email'),
//   check('email')
//     .isEmail()
//     .withMessage('Invalid Email'),
//   check('username')
//     .exists({ checkFalsy: true })
//     .withMessage('Username is required'),
//   check('username')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('Please provide a username with at least 4 characters.'),
//   check('username')
//     .not()
//     .isEmail()
//     .withMessage('Username cannot be an email.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage('Password must be 6 characters or more.'),
//   check('firstName')
//     .exists({ checkFalsy: true })
//     .withMessage('First Name is required'),
//   check('lastName')
//     .exists({ checkFalsy: true })
//     .withMessage('Last Name is required'),
//   handleValidationErrors
// ];


//FROM THE README
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

//FROM README
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });
    console.log(user);
    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);



// router.post('/', async (req, res) => {
//   const { email, password, username, firstName, lastName } = req.body;

//   let errors = {}
//   const allUsers = await User.findAll()
//   for (let i = 0; i < allUsers.length; i++) {

//     console.log(allUsers[i], 'USER INFO')
//     console.log(allUsers[i].email, 'email')
//     console.log(allUsers[i].username, 'username')
//     if (email === allUsers[i].email) errors.email = 'User with that email already exists'
//     if (username === allUsers[i].username) errors.username = 'User with that username already exists'
//   }
//   if (Object.keys(errors).length != 0) {
//     res.status(403)
//     return res.json({
//         message: "User already exists",
//         statusCode: 403,
//         errors
//     })
// }

//   const user = await User.signup({ email, username, password, firstName, lastName });
//   console.log(user);
//   await setTokenCookie(res, user);

//   return res.json({
//     user,
//   });
// }
// );

module.exports = router;
