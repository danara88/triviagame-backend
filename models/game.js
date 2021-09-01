const { Schema, model } = require('mongoose');
const moment = require('moment');

const GameSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required']
    },
    totalScore: {
        type: Number,
        default: 0
    },
    startDateTime: {
        type: Date,
        default: new Date()
    },
    endDateTime: {
        type: Date
    },
    timeGame: {
        type: String, 
        default: '00:00:00'
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

GameSchema.methods.toJSON = function() {
    const { __v, ...game } = this.toObject();
  
    return game;
}

module.exports = model('Game', GameSchema);