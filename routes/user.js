const { createUser, loginUser, getSingleUser } = require('../controllers/userController')

const router = require('express').Router()

//create new user
router.post('/new', createUser)

//login user
router.post('/login', loginUser)

// Single User Login
router.post('/me', getSingleUser)

// //get user profile page
// router.get('/:id', (req,res) => {
//     res.json({message: 'GET user profile'})
// })

module.exports = router