const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const formidableMiddleware = require('express-formidable');
//var cookies = require("cookie-parser");
var cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const render = require('./utils/render')

const dotenv = require("dotenv");
dotenv.config({ path: "./settings.env"})

const AppError = require("./utils/appError");
const globalErrorHandler = require("./Courses/controllers/errorHandlers");

app.use(cors({
  origin: ['https://courseapp.repillosa.com','https://hoppscotch.io', 'http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  name: 'example.sid',
  secret: 'Replace with your secret key',
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 1000 * 60 * 60 * 7,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/udemy'
  })
}));


app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


const courseRoutes = require("./Courses/routes.config");
const userRoutes = require("./users/routes.config");
const reviewRoutes = require("./reviews/routes.config");
const questionRoutes = require("./Questions/routes.confing");
const lessonRoutes = require("./Lessons/routes.config");
const responseRoutes = require("./Responses/routes.config");
const checkoutRoutes = require("./Checkout/routes.config");
const MediaRoutes = require("./Media/routes.config");
const SalesRoutes = require("./Sales/routes.config");
   
app.get('/', render('home'))

courseRoutes.routesConfig(app);
app.use("/lesson", lessonRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/question", questionRoutes);
app.use("/response", responseRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/media", MediaRoutes);
app.use("/sales", SalesRoutes)

app.get('/test', (req,res) => {
  res.sendFile(__dirname+'/index2.html')
})

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let extension = file.mimetype.split('/')[1]
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+extension)
    }
  })

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}

const upload = multer({ storage: storage })

app.post("/upload_files", upload.array("files"), uploadFiles);

app.use("*", (req, res, next) => {
  console.log("* route", req.originalUrl);
  next(new AppError(`I´m sorry but can´t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
  
  
  
  
