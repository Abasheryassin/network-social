const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// create new thought
function createThought(req, res) {
    Thought.create(req.body)
           .then((thought) => {
             return User.findByIdAndUpdate(
                { _id: req.body.userId},
                { $push: { thoughts: thought._id } },
            )})
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'Thought found, but found no user with that ID'});
                } else {
                    res.json('Created a Thought')
                }
            })
           .catch((err) => res.status(500).json(err));
};

// retrive all thoughts
function getThoughts(req, res) {
    Thought.find()
           .then((thought) => res.json(thought))
           .catch((err) => req.status(500).json(err));
};

// retrive single thought
function getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
           .then((thought) => {
            if (!thought) {
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

// update thought by id
function updateThought(req, res) {

};

// delete thought by id
function deleteThought(req, res) {

};

// add reaction to thought
function addReaction(req, res) {

};

// delete reaction to thought
function deleteReaction(req, res) {

};

module.exports = { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction};