const { Schema, model } = require('mongoose');
const moment = require('moment');

const QuestionSchema = Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required']
    },
    sentence: {
        type: String,
        required: [true, 'The sentence is required']
    },
    options: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    correctAnswer: {
        type: Schema.Types.ObjectId,
        ref: "Answer"
    },
    score: {
        type: Number,
        default: 10
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: moment().unix()
    },
    updatedAt: {
        type: String,
    }
});

QuestionSchema.methods.toJSON = function() {
    const { __v, ...question } = this.toObject();
  
    return question;
}

module.exports = model('Question', QuestionSchema);