const User = require("../models/user.models")
const Course = require("../../Courses/models/course.models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");




const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

exports.getUserById = catchAsync(async (req, res) => {
  
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: user
  })

});

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
  const userCourses = await User.findById(req.user._id).select("courses");

  res.status(200).json({
    status: "success",
    userCourses
  })
}

exports.giveCourseAccess = async (req, res) => {
  
    console.log('body giveaccess ',req.body);

    const course = await Course.findById(req.body.courseId);


    console.log(course);
    const UserAccess = { 
        name: course.name,
        courseId: course._id,
        photo: course.photo,
        role: "User" 
      };
    const user2 = await User.findById(req.user._id);
    console.log('1----------',user2);
    const user = await User.findByIdAndUpdate(req.user._id, { $push: { courses: UserAccess } }, {
      new: true,
      useFindAndModify: true
    } );
    console.log('2----------------',user);
    res.status(200).json({
      status: "success",
      user
    })
}

exports.renderMyCoursePage = async (req, res) => {
    const {courses} = await User.findById(req.user._id)

    res.render("user/myCourses", {courses})
  
}