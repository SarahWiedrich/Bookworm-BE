const { createUser, loginUser, getSingleUser } = require('../controllers/userController')

const router = require('express').Router()

//create new user
router.post('/new', createUser)

//login user
router.post('/login', loginUser)

// Single User Login
router.post('/me', getSingleUser)

module.exports = router