const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    reviewMessage: {
        type: String,
        required: [true, 'Review can not be empty'] 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    courseId: String,
    userId: String
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;