require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(cors("*"))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//attach routes to app
app.use('/books',bookRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT

// connect to mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`DB is connected listening on port`, PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })