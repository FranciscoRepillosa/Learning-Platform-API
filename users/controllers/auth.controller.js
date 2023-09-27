const User = require("../models/user.models");
const catchAsync = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const { promisify }= require("util");
const sendEmail = require("../../utils/email");
const crypto = require("crypto"); 

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync( async (req, res, next) => {
    
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    const timeToExpire = Date.now() + process.env.JWT_EXPIRES_IN;

    const cookieOptions = {
        httpOnly: true
    };

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    req.session.user = {
        username: newUser._id,
        // Add any other relevant user data you want to store in the session
    };
    
    res.status(201).json({
        status: "success",
        token,
        data : {
            newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError("Please provide wmail and pasword", 400));
    }
    
    const user = await User.findOne({ email });

    if (!user || !(await  user.correctPassword(password, user.password))) {
       return next( new AppError('Incorrect email or password', 402));
    }

    const token = signToken(user._id);
   
    req.session.user = token


    // if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // res.cookie("jwt", token, cookieOptions);
    // res.cookie("love yourself", 'i love u');

    //console.log("cookie  ", res.cookie)

    console.log(req.session);
    
    res.status(201).json({
        status: "success",
        token
    })
}); 

exports.protect = catchAsync(async (req, res, next) => {

    console.log('token  ', req.session);

    let token = req.session.user;
//    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//    }     
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

   const CurrentUser = await User.findById(decoded.id);

   console.log(CurrentUser);

   if(!CurrentUser) {
       return next(new AppError('The user belonging to this token does no longer exist', 401 ))
   }
   
   if(CurrentUser.changePasswordAfter(decoded.iat)) {
       return next(new AppError('User recently changed password, please log in again', 401));
   }

   console.log('pass protect middleware')

   req.user = CurrentUser;
   next();
});


exports.restricTo = (role) => {
    return (req, res, next) => {     
        let isAuthorized;
        console.log('user courses', req.user)

        const isLogin = req.user;

        const isAdemoVideo = req.params.mediaType === 'demoVideos';

            req.user.courses.forEach(course => {
                console.log(course);
                console.log(req.params.courseId);
                console.log(req.user);
                console.log("accepted role  ", course.role === role[0] || course.role === role[1]);
                console.log("is the correct course  ", course.courseId === req.params.mediaSourceId);
                
                const userBroughtTheCourse = course.courseId === req.params.mediaSourceId || course.courseId === req.params.courseId;
                const hasTheCorrectRole = role.includes(course.role)

                if (userBroughtTheCourse && hasTheCorrectRole) {
                    isAuthorized = true;
                }
            });
        

            if(isAuthorized || isAdemoVideo) {
                console.log(req.user);
                return next()
            }
      
            next(new AppError("you don't have permission to perform this accion", 202));
    }
}
  
exports.forgotPassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });
    
    if(!user) {
        return next( new AppError(`There is no user with this email adress:${req.body.email}`));
    }
 
    const resetToken = user.createPasswordResetToken();
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;

    const message = `Forgot your password? go to the following link:${resetUrl} 
                    and if you don't hope this email go to contac us to protect your account`;

    try {
        await sendEmail({
            email: user.email,
            subject: '¡¡ o_o YOU ONLY HAVE 10 MIN!! to reset your password',
            message
        });                                 
        console.log('are equal ',process.env.EMAIL_PORT === 2525);
        res.status(200).json({
            status: "success",
            message: 'reset link sended to email'
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false});
        console.log(err);
        console.log(process.env.EMAIL_PORT, process.env.EMAIL_HOST );

        return next(new AppError('Theres was an error sending the email, please try again, later', 500))

    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt : Date.now() }
    });
    
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne(req.user._id);
    
    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
        return next(new AppError('Password incorrect if you forget you password click: forgotPassword', 403));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await  user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });


});