const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// create a new user
function createUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
};

// retrive all users
function getUsers(req, res) {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => {
            console.error({ message: err });
            return res.status.json(err);
        });
};

// retrive a single user
function getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .populate({ path: 'Thought', select: '-__v' })
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.error({ message: err });
            return res.status.json(err);
        });
};

// update a user by id
function updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId},
        {username: req.body.username,
        email: req.body.email})
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            } else {
                res.json(user);
            }
        })
        .catch((err) => {
            console.error({ message: err });
            return res.status.json(err);
        });
};

// delete user by id
function deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// add friend to users friend list by id
function addFriend() {

};

// delete friend on users friend list by id
function deleteFriend() {

};

module.exports = { createUser, getUsers, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend };