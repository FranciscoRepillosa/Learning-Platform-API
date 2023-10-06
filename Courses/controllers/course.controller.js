const User = require("../../users/models/user.models");
const Course = require("../models/course.models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Lesson = require("../../Lessons/models/lesson.model");
const multer = require("multer");
const fs = require("fs");

exports.test = (req, res) => {
  console.log(req.files.coverImage[0].path);
  res.send(req.files.coverImage[0].filename);
}

exports.renderCourse = catchAsync(async (req, res) => {

  const {courseId} = req.params

  const course = await Course.findById(courseId)

  const lessons = await Lesson.find({"courseId": courseId})

  let user = req.user

  res.render('course/show', {course, lessons, user})

})

exports.getAllCourses = catchAsync(async (req, res) => {
  const queryObj = {...req.query};
  const excludeFields = ["page", "sort", "limit", "fields", "latest"];
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

  let limit = req.query.limit ? Number(req.query.limit) : {}

  const query = Course.find(queryObj).sort(req.query.latest ? { _id: -1 } : {}).limit(limit);

  const courses = await query;

  res.status(200).json({
    status: "success",
    results: courses.length,
    data : {
      courses
    }
  })

});

const fileFilter = (req, file, cb) => {
 
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  
  // To reject this file pass `false`, like so:
  //cb(null, false)
 
  // To accept the file pass `true`, like so:
  if (true) {
    console.log("from multer filter", file);
    cb(null, true)
  }
  // You can always pass an error if something goes wrong:
  //cb(new Error('I don\'t have a clue!'))
 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImage") {
        cb(null, "MediaStorage/courses/coverImages");
    } else {
      cb(null, "MediaStorage/courses/demoVideos")
    }
  },
  filename: (req, file, cb) => {
    const exc = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({
  storage,
  fileFilter
});

exports.uploadIntroFiles = upload.fields([ {name:"coverImage", maxCount: 1}, {name: "videoIntro", maxCount: 1} ]);


exports.CreateCourse = catchAsync(async (req, res, next) => {
    
    const courseContent = {
      name: req.body.courseName,
      category: "tech",
      description: req.body.courseDescription,
      photo: req.files.coverImage[0].filename,
      videoIntro: req.files.videoIntro[0].filename,
      priceInCents: req.body.price*100,
      author: req.user.name,
      authorId: req.user._id
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


