const express = require("express");
const app = express();
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./Courses/controllers/errorHandlers");


app.use(cors())
app.use(express.json())


const courseRoutes = require("./Courses/routes.config");
const userRoutes = require("./users/routes.config");
const reviewRoutes = require("./reviews/routes.config");
const questionRoutes = require("./Questions/routes.confing");
const lessonRoutes = require("./Lessons/routes.config");
const responseRoutes = require("./Responses/routes.config");
const checkoutRoutes = require("./Checkout/routes.config");

   

courseRoutes.routesConfig(app);
app.use("/lesson", lessonRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/question", questionRoutes);
app.use("/response", responseRoutes);
app.use("/checkout", checkoutRoutes)


app.use("*", (req, res, next) => {
  console.log("* route", req.originalUrl);
  next(new AppError(`I´m sorry but can´t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
  
  
  
  