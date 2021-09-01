const { Schema, model } = require('mongoose');
const moment = require('moment');

const RankingSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user is required']
    },
    totalScore: {
        type: Number,
        default: 0
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

RankingSchema.methods.toJSON = function() {
    const { __v, ...ranking } = this.toObject();
  
    return ranking;
}

module.exports = model('Ranking', RankingSchema);