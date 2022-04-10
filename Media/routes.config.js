const express = require("express")
const router = express.Router();
const authController = require("../users/controllers/auth.controller");
const mediaController = require("../Media/controllers/media.controller");

router.get("/:mediaSource/:mediaType/:mediaId", authController.protect,
                                                authController.restricTo(['instructor', "User"]),
                                                mediaController.getMedia);

router.get("/userimage", authController.protect,
                         mediaController.getUserImage);




module.exports = router;
                                
