const router = require('express').Router();
const { createUser, getUsers, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;