const AppError = require("../../utils/appError")

const handleObjectIdError = err => {
  const message = `invalid ${err.path}: ${err.stringValue}`;
  return new AppError(message, 400);
}

const handleJWTError = () => new AppError('invalid token please log in again!', 401);
const handleJWTExpiresError = ()  => new AppError("Your token has expires, please log in again", 401); 



const sendErrorDev = (err , res) => {
  console.log('enter sendErrorDev');
  console.log('here comes the shit',err);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err , res) => {
  console.log('from send errorProd');
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.error("ERROR *x*x*x*x", err);
    res.status(500).json({
      status: "error",
      message: "Somenthing went very wrong!"
 
    })
  }
  
}



module.exports = (err, req, res, next) => {
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    console.log(process.env.NODE_ENV, 'from error');

    if (process.env.Node_ENV === "development") {
      console.log('the fuck yo');
      console.log(req.originalUrl);
      sendErrorDev(err, res)
    } else if (process.env.Node_ENV === "production") {
                                         console.log('the error bish from error handler: ',err);

      //    CHANGE THIS TO SWICHT STATEMENT

      if (err.kind === "ObjectId") {
        err = handleObjectIdError(err);
      }
       if (err.name === "JsonWebTokenError") {
         err = handleJWTError()
       }
      if(err.name === "TokenExpiredError") {
        err = handleJWTExpiresError()
      }
        sendErrorProd(err, res)
    }
}