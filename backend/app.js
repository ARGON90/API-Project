const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
const routes = require('./routes')



// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
//allow cors in development

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);
//the cookies only need to be secure in production



//requests start at line 1 here
app.use(routes);
//this pulls info from route/index which pulls info from routes/api/index

//Resource not found Error Handler
//catch unhandled requests and forward to the error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
//underscore: convention to convery intent of a specific variabele
//need access to next, but not req/res. the underscore in this instance
//actually serves as a placeholder


// Sequelize Error-Handler
// This catches errors and formats them before sending the response
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);

  // Error Formatter Error handler - should be LAST
  //formats all errors before returning a json response
  //includes stack trace if the environment is in development
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });
});
//turnery operators: evaluates expressions
//syntax: ? <option1> : <option2>
//if production, the stack is null, otherwise, err.stack

module.exports = app;
