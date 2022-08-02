const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);
    // if (validationErrors.errors[0].msg === 'First Name is required') {
    //   _res.status(400)
    //   _res.json({
    //     message: "Validation error",
    //     statusCode: 400,
    //     errors: {
    //       firstName: "First Name is required"
    //     }
    //   })
    // }
    // if (validationErrors.errors[0].msg === 'Last Name is required') {
    //   _res.status(400)
    //   _res.json({
    //     message: "Validation error",
    //     statusCode: 400,
    //     errors: {
    //       lastName: "Last Name is required"
    //     }
    //   })
    // }
    // if (validationErrors.errors[0].msg === 'Invalid Email') {
    //   _res.status(400)
    //   _res.json({
    //     message: "Validation error",
    //     statusCode: 400,
    //     errors: {
    //       email: "Invalid Email"
    //     }
    //   })
    // }
    // if (validationErrors.errors[0].msg === 'Username is required') {
    //   _res.status(400)
    //   _res.json({
    //     message: "Validation error",
    //     statusCode: 400,
    //     errors: {
    //       Username: "Username is required"
    //     }
    //   })
    // }
    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
