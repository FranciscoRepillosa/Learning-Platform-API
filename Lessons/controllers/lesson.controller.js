const Lesson = require("../models/lesson.model");
const catchAsync = require("../../utils/catchAsync");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "media/courses/videoLessons");
    },
    filename: (req, file, cb) => {
      const exc = file.mimetype.split("/")[1];
      console.log(file);
      req.body.videoPath = `${req.params.courseId}-${file.originalname}`;
      cb(null, `${req.params.courseId}-${file.originalname}`);
    }
  })
  
  const upload = multer({
    storage
  });
  
exports.uploadLesson = upload.single("videolesson");

exports.getLesson = catchAsync( async (req, res) => {
  
    const data = await Lesson.find({ courseId: req.params.courseId })
      res.send(data);
});   
  

exports.addLesson = catchAsync(async (req, res) => {
    
    const lessonList =  await Lesson.find({ courseId: req.params.courseId });
  
      const newLesson = await Lesson.create({
        courseId: req.params.courseId,
        name: req.body.name,
        position: lessonList.length + 1,
        videoPath: req.body.videoPath
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