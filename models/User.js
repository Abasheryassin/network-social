const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;