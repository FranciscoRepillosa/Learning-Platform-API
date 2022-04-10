const Lesson = require("../models/lesson.model");
const catchAsync = require("../../utils/catchAsync");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "MediaStorage/courses/videoLessons");
    },
    filename: (req, file, cb) => {
      const exc = file.mimetype.split("/")[1];
      console.log(file);
      req.body.videoLesson = `${req.params.courseId}-${Date.now()}-${file.originalname}`;
      cb(null, `${req.params.courseId}-${Date.now()}-${file.originalname}`);
    }
  })
  
  const upload = multer({
    storage
  });
  
exports.uploadLesson = upload.single("videoLesson");

exports.getLesson = catchAsync( async (req, res) => {
  
    const data = await Lesson.find({ courseId: req.params.courseId })
      res.send(data);
});   
  

exports.addLesson = catchAsync(async (req, res) => {
    
    const lessonList =  await Lesson.find({ courseId: req.params.courseId });

    console.log("body", req.body);
  
      const newLesson = await Lesson.create({
        courseId: req.params.courseId,
        name: req.body.lessonName,
        position: lessonList.length ? lessonList.length + 1 : 1,
        videoPath: req.body.videoLesson
      });
    
    res.status(200).json({
        status: "success",
        newLesson 
    })
  });

exports.updateLesson = catchAsync( async (req, res) => {

    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body, {new: true});
    
    res.status(200).json({
        status: "success",
        updatedLesson 
    })
       
});