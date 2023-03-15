const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// create new thought
function createThought(req, res) {
    Thought.create(req.body)
           .then((thought) => {
            console.log(thought._id);
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id } },
                { new: true})
            })
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
                res.status(404).json({ message: 'No thought with that ID' });
            } else {
                res.json(thought);
            }
        })
        .catch((err) => {
            console.error({ message: err });
            res.status.json(err);
           });
};

// update thought by id
function updateThought(req, res) {
    Thought.findByIdAndUpdate(
        {_id : req.params.thoughtId},
        req.body
    )
           .then((thought) => {
            if(!thought) {
                res.status(404).json({ message: 'No thought with this id'});
            } else {
                res.json(thought);
            }
           })
           .catch((err) => {
            console.error({ message: err });
            return res.status.json(err);
           });
};

// delete thought by id
function deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
           .then((thought) => {
                if(!thought) {
                    res.status(404).json({ message: "No thought found with this id"});
                } else {
                    return User.findOneAndUpdate(
                        { thoughts: thought._id},
                        { $pull: {thoughts: thought._id}},
                        { new: true})
                }
           })
           .then((user) => {
            if (!user) {
                res.status(404).json("Thought deleted, but no user found with this ID");
            } else {
                res.status(200).json("Thought deleted!");
            }
           })
           .catch((err) => {
            console.log(err);
            res.status(500).json(err);
           })
};

// add reaction to thought
function addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $addToSet: {reactions: req.body}},
        { runValidators: true, new: true},
    )
           .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID'})
            } else {
                res.status(200).json(thought);
            }
           })
};

// delete reaction to thought
function deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: {reactions: { reactionId: req.params.reactionId}}},
        { runValidators: true, new: true},
    )
          .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with that ID' })
            } else {
                res.json('reaction deleted');
            }
        })
        .catch((err) => res.status(500).json(err));
};

module.exports = { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction};