const Books = require('../models/usersBooks.js')
const mongoose = require('mongoose')
const axios = require('axios')

//API Key
const API_KEY = process.env.API_KEY

//API link
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'
// const searchByTitle = `https://www.googleapis.com/books/v1/volumes?q=${intitle}&key=${API_KEY}`
// const searchByAuthor = `https://www.googleapis.com/books/v1/volumes?q=${inauthor}`
// const searchBySubject = `https://www.googleapis.com/books/v1/volumes?q=${subject}`

//search all books
const getAllBooks = async (req, res) => {
    // axios({
    //     url: API_URL,
    //     responseType: 'json'
    // })
    // .then(async response => {
    //     const bookData = response.data;
    //     res.render(bookData)
    // })
    try{
        const books = await fetch(API_URL)
        return await books.json()
        
    } catch (err) {
        console.error(err)
    }
}


//search by title
const getBookByTitle = async (req, res) => {
    try {
        const book = await fetch(searchByTitle)
        return await book.json() 
    } catch (err) {
        console.error(err)
    }
}

const getAuthor = async (req, res) => {
    try {
        const books = await fetch(searchByAuthor)
        return await books.json()
    } catch (err) {
        console.error(err)
    }
}

//search by subject
const getSubject = async (req, res) => {
    try {
        const books = await fetch(searchBySubject)
        return await books.json()
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    getAllBooks,
    getBookByTitle,
    getAuthor,
    getSubject
}