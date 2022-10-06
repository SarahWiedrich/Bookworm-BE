const { createUser, loginUser } = require('../controllers/userController')

const router = require('express').Router()

//create new user
router.post('/new', createUser)

router.post('/login', loginUser)

//get user profile page
router.get('/:id', (req,res) => {
    res.json({message: 'GET user profile'})
})

module.exports = router