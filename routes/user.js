const { createUser, loginUser } = require('../controllers/userController')

const router = require('express').Router()

//create new user
router.post('/new', createUser)

//login user
router.post('/login', loginUser)


module.exports = router