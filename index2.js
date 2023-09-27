const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./Courses/controllers/errorHandlers");


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://hoppscotch.io"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "LoginSystem",
// });

// app.post("/register", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) {
//       console.log(err);
//     }

//     db.query(
//       "INSERT INTO users (username, password) VALUES (?,?)",
//       [username, hash],
//       (err, result) => {
//         console.log(err);
//       }
//     );
//   });
// });

app.get("/user/courses", (req, res) => {
    console.log(req.session);
  res.send('lightweight')
});

app.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  req.session.user = 'bunda';

  console.log(req.session);

  res.send('ok')
});

// const userRoutes = require("./users/routes.config");
// app.use("/user", userRoutes);



app.use("*", (req, res, next) => {
    console.log("* route", req.originalUrl);
    next(new AppError(`I´m sorry but can´t find ${req.originalUrl} on this server`, 404));
  });

app.use(globalErrorHandler);


module.exports = app;
