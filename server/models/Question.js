const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [String], 
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);