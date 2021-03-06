const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })

process.on("uncaughtException", err => {
  console.log(err);
  console.log(err.name, err.message);
  // notify delelopers
    process.exit(1);
});

const app = require("./index");


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/udemy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(" we're connected!! ");
});

const port = process.env.PORT || 3000 ;

 const server = app.listen(port, function () {
    console.log(`listen on port ${port}`)
});

process.on("unhandledRejection", err => {
  console.log(err);
  console.log(err.name, err.message);
  // notify delelopers  
  server.close(() => {
    process.exit(1);
  })
});



