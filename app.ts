import createError from "http-errors";
import * as express from "express";
import * as morgan from "morgan";
import {processSlackSlashCommand} from "./src/slack";
import cookieParser = require("cookie-parser");
import {router} from "./src/router";

export const app = express();

// view engine setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('500');
});
