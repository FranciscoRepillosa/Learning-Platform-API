const express = require("express");
const app = express();
const cors = require("cors");
const formidableMiddleware = require('express-formidable');
//var cookies = require("cookie-parser");
var cookieParser = require('cookie-parser')


const AppError = require("./utils/appError");
const globalErrorHandler = require("./Courses/controllers/errorHandlers");

app.set('trust proxy', true)


app.use((req, res, next) => {
        console.log(req.headers['x-real-ip'] || req.connection.remoteAddress )
        next()
})

app.use(cors({
  origin: ['https://courseapp.repillosa.com','https://hoppscotch.io', 'http://localhost:3000'],
  credentials: true
}));



/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://courseapp.repillosa.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
*/

app.use(express.json());
app.use(cookieParser())
//app.use(cookies());
//app.use(formidableMiddleware());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



app.use(express.json());
app.use(cookieParser())
//app.use(cookies());
//app.use(formidableMiddleware());

const courseRoutes = require("./Courses/routes.config");
const userRoutes = require("./users/routes.config");
const reviewRoutes = require("./reviews/routes.config");
const questionRoutes = require("./Questions/routes.confing");
const lessonRoutes = require("./Lessons/routes.config");
const responseRoutes = require("./Responses/routes.config");
const checkoutRoutes = require("./Checkout/routes.config");
const MediaRoutes = require("./Media/routes.config");
   

courseRoutes.routesConfig(app);
app.use("/lesson", lessonRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/question", questionRoutes);
app.use("/response", responseRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/media", MediaRoutes);


app.use("*", (req, res, next) => {
  console.log("* route", req.originalUrl);
  next(new AppError(`I´m sorry but can´t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
  
  
  
  