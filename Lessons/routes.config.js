const express = require("express")
const router = express.Router();
const authController = require("../users/controllers/auth.controller");
const lessonController = require("./controllers/lesson.controller");

router.post("/:courseId", authController.protect,
                         authController.restricTo('instructor'),
                         lessonController.uploadLesson,
                         lessonController.addLesson);

router.get("/:courseId", lessonController.getLesson);
                          

 router.patch("/:courseId/:lessonId", authController.protect,
                                      authController.restricTo('instructor'),
                                      lessonController.updateLesson);


module.exports = router;
                                
