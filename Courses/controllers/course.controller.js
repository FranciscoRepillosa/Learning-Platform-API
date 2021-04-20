const User = require("../../users/models/user.models");
const Course = require("../models/course.models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Lesson = require("../../Lessons/models/lesson.model");
const multer = require("multer");
const fs = require("fs");

exports.getAllCourses = catchAsync(async (req, res) => {
  const queryObj = {...req.query};
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach(field => delete queryObj[field]);
  
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, macth => `$${macth}`);
  console.log(queryStr);

if(req.query.searchInput) {
  console.log("oh no search query");
  
    const regex = new RegExp(req.query.searchInput, 'i')
    const courses = await Course.find( {name: {$regex: regex} } );
    
    return res.status(200).json({
      status: "success",
      results: courses.length,
      data : {
        courses
      }
    })
}
 
  const query = Course.find(queryObj);

  const courses = await query;

  res.status(200).json({
    status: "success",
    results: courses.length,
    data : {
      courses
    }
  })

});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/courses/coverImages");
  },
  filename: (req, file, cb) => {
    const exc = file.mimetype.split("/")[1];
    console.log("userId:", req.user._id);
    req.body.imagePath = `${req.user._id}-${file.originalname}`;
    cb(null, `${req.user._id}-${file.originalname}`);
  }
})

const upload = multer({
  storage
});

exports.uploadCourseImage = upload.single("courseImage");


exports.CreateCourse = catchAsync(async (req, res, next) => {
    
    const courseContent = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      photo: req.body.imagePath,
      author: req.user.name
  }

     const newCourse = await Course.create(courseContent);

     const instructorAccess = { courseId: newCourse._id, role: "instructor" };
        
     const user = await User.findByIdAndUpdate(req.user._id, { $push: { courses: instructorAccess } } );
        
    res.status(201).json({
        status: "success",
        user: user,
        data : {
           newCourse
            }
    })
    
});

exports.getById = catchAsync(async (req, res ) => {
   
    const course = await Course.findById(req.params.courseId);
    
    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
    
})

exports.updateCourse = (req, res) => {
  
  Course.updateOne({_id: req.params.courseId}, req.body,
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}






exports.getLesson = catchAsync( async (req, res) => {
  let byCourseId = {
    courseId: req.params.courseId
  }
  const data = await Lesson.find(byCourseId)
    res.send(data);
});   


exports.addLesson = catchAsync(async (req, res) => {
  let byCourseId = {
    courseId: req.params.courseId
  }
  const lessonList =  await Lesson.find(byCourseId);

    console.log(req.body);
    const newLesson = await Lesson.create({
      courseId: req.params.courseId,
      name: req.body.name,
      position: lessonList.length + 1,
      videoPath: req.body.videoPath
    });
    //const course = await Course.findByIdAndUpdate(req.params.courseId, { $push: { lessons: {name: req.body.name } } });
  
    
  res.status(200).json({
      status: "success",
      newLesson 
  })
});

exports.updateLesson = catchAsync( async (req, res) => {

    const course = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body);

    res.send(course)
       
});

exports.getImageCover = (req, res) => {
  console.log("imagecover");
  res.sendFile(__dirname + `../../media/courses/coverImages/${req.params.imagePath}`);
}

//Person.update({'items.id': 2}, {'$set': {
 //   'items.$.name': 'updated item2',
   // 'items.$.value': 'two updated'
//}}

    
/*
exports.getByCategory = 

exports.getById = (req,res) => {

    res.send(courseModel.coursesById());
}

exports.newCourse = (req, res) => {
    
    res.send(courseModel.addnewCourse())
}

exports.getLesson = (req, res) => {
    
    res.send(courseModel.courseLesson(req.params))
}

*/


