const router = require('express').Router();
const { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;