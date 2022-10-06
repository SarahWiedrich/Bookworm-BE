const { 
    getAllBooks
 } = require('../controllers/booksController')

const router = require('express').Router()

//GET all books
router.get('/all', getAllBooks)

//GET single book
router.get('/:id', (req, res) => {
    res.json({message:'GET single book'})
})

//POST add book to favorites
router.post('/add', (req, res) => {
    res.json({message: 'POST favorite book'})
})

//DELETE a book from favorites
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a favorite'})
})

module.exports = router