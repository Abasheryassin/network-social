const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        thoughts: [thoughtSchema],
        friends: [friendSchema]
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const User = model('user', userSchema);

module.exports = User;