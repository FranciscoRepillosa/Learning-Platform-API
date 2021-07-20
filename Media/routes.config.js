const express = require("express")
const router = express.Router();
const authController = require("../users/controllers/auth.controller");
const mediaController = require("../Media/controllers/media.controller");

router.get("/:mediaSource/:mediaType/:mediaId", authController.protect,
                         mediaController.getMedia)




module.exports = router;
                                
