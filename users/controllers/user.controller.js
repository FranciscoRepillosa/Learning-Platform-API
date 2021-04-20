const User = require("../models/user.models")
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

exports.getAllUsers = catchAsync(async (req, res) => {
    
    const users = await User.find();
  
     res.status(200).json({
      status: "success",
      results: users.length,
      data : {
          users
      }
    })
  });

exports.updateUser = catchAsync(async (req, res) => {
    const filteredBody = filterObj(req.body, 'name','email');
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data : {
          updatedUser
      }
    })
});

exports.addToFavorites = async (req, res) => {
    const newFavorite = await User.findByIdAndUpdate(req.user._id, { $push: { favorites: {
      courseId: req.body.courseId,
      name: req.body.name,
      photo: req.body.photo} } } );

    res.status(200).json({
      status: "success",
      data : {
          newFavorite
      }
    })
}

exports.getFavorites = async (req, res) => {
  const favoriteCourses = await User.find({_id: req.user._id}).select("favorites -_id");

  res.status(200).json({
    status: "success",
    favoriteCourses
  })
}

exports.getUserCourses = async (req, res) => {
  const userCourses = await User.findById(req.user._id).select("courses -_id");

  res.status(200).json({
    status: "success",
    userCourses
  })
}

exports.giveCourseAccess = async (req, res) => {
  
    const UserAccess = { courseId: req.body.courseId, role: "User" };
    console.log("from giveCoureseAccess ", req.user._id);
    const user = await User.findByIdAndUpdate(req.user._id, { $push: { courses: UserAccess } }, {
      new: true,
      useFindAndModify: true
    } );

    res.status(200).json({
      status: "success",
      user
    })
}