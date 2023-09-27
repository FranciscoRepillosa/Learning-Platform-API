const dotenv = require("dotenv");
dotenv.config({ path: "./settings.env"})

process.on("uncaughtException", err => {
  console.log(err);
  console.log(err.name, err.message);
  // notify delelopers
    process.exit(1);
});

const app = require("./index");


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/udemy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(" we're connected!! ");
});

console.log(process.env);

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



