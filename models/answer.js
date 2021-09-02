const { Schema, model } = require('mongoose');
const moment = require('moment');

const AnswerSchema = Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'The name is required'],
    },
    content: {
        type: String,
        required: [true, 'The content is required'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: String,
        default: moment().unix()
    },
    updatedAt: {
        type: String,
    }
});

AnswerSchema.methods.toJSON = function() {
    const { __v, status, ...answer } = this.toObject();
    return answer; 
}

module.exports = model('Answer', AnswerSchema)