const { Schema, model, Types, default: mongoose } = require('mongoose');
const { thoughtSchema } = require('./Thought');

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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a vaild email']
        },
        thoughts: [thoughtSchema],
        friends: [mongoose.SchemaTypes.ObjectId]
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

const User = model('user', userSchema);

module.exports = User;