const { User } = require('../models');

// create a new user
function createUser(res, req) {
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
function getSingleUser() {

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