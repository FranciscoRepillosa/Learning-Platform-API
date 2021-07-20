const courseController = require("./controllers/course.controller");
const authController = require("../users/controllers/auth.controller");
const User = require("../users/models/user.models");
console.log(courseController.uploadCourseImage);

exports.routesConfig = function (app) {
    
    app.get("/courses", courseController.getAllCourses);

    app.post("/courses", authController.protect, courseController.uploadIntroFiles, courseController.CreateCourse);

     
    
    app.get("/courses/:courseId", courseController.getById);

    app.post("/courses/test", courseController.uploadIntroFiles, courseController.test);

   // app.delete("/courses/:courseId", courseController.deleteCourse);

   /*
   app.post("/courses/:courseId", authController.protect,
                                   authController.restricTo('instructor'),
                                   courseController.uploadLesson,
                                   courseController.addLesson);
    */

    app.patch("/courses/:courseId", authController.protect,
                                    authController.restricTo('instructor'),
                                    courseController.updateCourse);


    app.get("/courses/coverImage/:imagePath", courseController.getImageCover);
    
    /*
    app.get("/courses/:courseId/:lessonId", authController.protect,
                                            authController.restricTo('user'),
                                            courseController.getLesson);

    app.patch("/courses/:courseId/:lessonId", authController.protect,
                                              authController.restricTo('instructor'),
                                              courseController.updateLesson);

    //app.delete("/courses/:courseId/:lesson", courseController.deleteLesson);

**

/*
    app.get("/courses/:id/:lesson", courseController.getLesson);


    app.get("/course/editor", courseController.get);

    app.get("/course/editor/:id", courseController.getById);

*/



}