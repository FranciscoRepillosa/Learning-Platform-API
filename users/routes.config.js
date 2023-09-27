const express = require("express")

const router = express.Router();

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const render = require('../utils/render')
const { route } = require("..");

// views

router.get("/login", render('user/login'));
router.get("/mycourses", authController.protect,userController.renderMyCoursePage);
router.get('/signup', render('user/signup'))



router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);

router.patch('/updateMe', authController.protect, userController.updateUser);

router.post('/favorite', authController.protect, userController.addToFavorites);
router.get('/favorite', authController.protect, userController.getFavorites);

router.get("/courses", authController.protect, userController.getUserCourses);
router.post('/giveCourseAccess', authController.protect, userController.giveCourseAccess);

router
    .route("/")
    .get(authController.protect, userController.getAllUsers);
    

module.exports = router;