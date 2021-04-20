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
    price: Number,
   /*
    lessons: [{
        videoPath: String,
        name: String
    }],
    */
    author: String

});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;