const mongoose = require("mongoose");



const LessonSchema = new mongoose.Schema({
    courseId: String,
    name: {
        type: String,
        unique: true
    },
    position: Number,
    videoPath: String

});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;