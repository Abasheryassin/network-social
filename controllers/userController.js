const { User } = require('../models');

function getUsers(req, res) {
    User.find()
        .then((users) => res,json(users))
        .catch((err) => {
            console.error({message: err});
            return res.status.json(err);
        });
};

function createUser(res, req) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
}

module.exports = {getUsers, createUser};