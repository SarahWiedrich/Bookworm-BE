require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send("Hello")
})

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