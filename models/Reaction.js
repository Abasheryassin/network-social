const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

function dateFormat(date) {
    dayjs(date).format('DD/MM/YYYY [at] h:mm');
};

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            manlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: true
    }
);

module.exports = reactionSchema;