const express = require("express")

const router = express.Router();

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

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