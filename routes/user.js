const router = require('express').Router()

//create new user
router.post('/new',(req, res) => {
    res.json({message: 'POST create new user'})
})

//get user profile page
router.get('/:id', (req,res) => {
    res.json({message: 'GET user profile'})
})

module.exports = router