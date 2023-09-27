const express = require("express")
const router = express.Router();
const authController = require("../users/controllers/auth.controller");
const lessonController = require("./controllers/lesson.controller");
const render = require("../utils/render")

router.get("/:courseId/show", authController.protect, authController.restricTo('instructor'), lessonController.renderNewLessonPage );

router.post("/:courseId", authController.protect,
                         authController.restricTo(['instructor']),
                         lessonController.uploadLesson,
                         lessonController.addLesson);

router.get("/:courseId", lessonController.getLesson);
                          

 router.patch("/:courseId/:lessonId", authController.protect,
                                      authController.restricTo('instructor'),
                                      lessonController.updateLesson);


module.exports = router;
                                
