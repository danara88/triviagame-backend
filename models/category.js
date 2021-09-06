const { Schema, model } = require('mongoose');
const moment = require('moment');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'The description is required']
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

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject();
    return category; 
}

module.exports = model('Category', CategorySchema)