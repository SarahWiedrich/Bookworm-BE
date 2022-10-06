const {   } = require('../controllers/userController')

const router = require('express').Router()


//POST add book to favorites
router.post('/add', (req, res) => {
    res.json({message: 'POST favorite book'})
})

//DELETE a book from favorites
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a favorite'})
})

module.exports = router





// //GET all books
// router.get('/all', getAllBooks)

// //GET single book
// router.get('/:id', (req, res) => {
//     res.json({message:'GET single book'})
// })