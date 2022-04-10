const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt= require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
        
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            }
        }
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    favorites: [{
        name: String,
        photoUrl: String,
        courseUrl: String
    }],
    courses: [{
        courseId: String,
        name: String,
        photo: String,
        role: {
            type: String,
            enum: ["user", "instructor"]
        }
    }]

});

UserSchema.pre("save", async function (next) {
    console.log('is modified', this.isModified('password'))
    if ( this.isModified('password') ) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;
        this.passwordChangeAt = Date.now() - 2000;
        return next();
    }
    next()
})

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

UserSchema.methods.changePasswordAfter = function(JWTTimestamp) {
   if (this.passwordChangeAt) {
      const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    console.log(JWTTimestamp, changeTimeStamp);
      return JWTTimestamp < changeTimeStamp;
   }
   
    return false;
};

UserSchema.methods.createPasswordResetToken = function () {
     const resetToken = crypto.randomBytes(32).toString('hex');

     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

     this.passwordResetExpires = Date.now() + 1440 * 60 * 1000;

     return resetToken;
};


const User = mongoose.model('User', UserSchema);



module.exports = User;