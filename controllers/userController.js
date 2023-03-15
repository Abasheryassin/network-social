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
        .populate('thoughts')
        .populate('friends')
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
            res.status(500).json(err);
        });
};

// update a user by id
function updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            username: req.body.username,
            email: req.body.email
        })
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
    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json('No user found with this ID');
            } else {
                return Thought.deleteMany({ username: user.username})
            }
        })
        .then((thought) => {
            if (!thought){
                res.status(404).json("User deleted, but no thoughts found")
            } else {
                res.status(200).json("User and corresponding thoughts deleted");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

// add friend to users friend list by id
function addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with that ID' })
            } else {
                res.json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
};

// delete friend on users friend list by id
function deleteFriend(req, res) {
    User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true },
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with that ID' })
            } else {
                res.json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
};

module.exports = { createUser, getUsers, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend };