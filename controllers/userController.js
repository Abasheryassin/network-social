const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

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
            console.error({message: err});
            return res.status.json(err);
        });
};

// retrive a single user
function getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
        .populate({ path: 'Thought', select: '-__v' })
        .select('-__v')
        .then((user) => {
            if(!user){
                res.status(404).json({ message: 'No user with that ID' });
            } else {
                res.json(user);
            }
        });
};

// update a user by id
function updateUser() {

};

// delete user by id
function deleteUser() {

};

// add friend to users friend list by id
function addFriend() {

};

// delete friend on users friend list by id
function deleteFriend() {

};

module.exports = { createUser, getUsers, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend };