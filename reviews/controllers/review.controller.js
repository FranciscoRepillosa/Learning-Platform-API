const Review = require("../models/review.models");

exports.createReview = async (req, res) => {
    const review = await Review.create(req.body);

    res.status(201).json({
        status: "success",
        data : {
            review
        }
    });
};

exports.getReviews = async (req, res) => {
    const review = await Review.find({courseId: req.params.courseId}); 

    res.status(201).json({
        status: "success",
        data : {
            review
        }
    });
};
