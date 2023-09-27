const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A course most have a name']
    },
    category: {
        type: String,
        required: [true, 'A course most have a category']
    },
    description: String,
    photo: String,
    videoIntro: String,
    priceInCents: Number,
   /*
    lessons: [{
        videoPath: String,
        name: String
    }],
    */
    author: String,
    authorId: String

});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;