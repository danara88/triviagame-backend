const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = Schema({
    fullName: {
    type: String,
    required: [true, 'The full name is not optional']
    },
    email: {
        type: String,
        required: [true, 'The email is not optional'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is not optional'],
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
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

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;

  return user;
}

module.exports = model('User', UserSchema);
