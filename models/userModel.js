const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngkey.com%2Fmaxpic%2Fu2q8r5t4i1y3q8i1%2F&psig=AOvVaw2QFcjXZ4JkvYq1TxAEB6cZ&ust=1664644304800000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJD27eiBvfoCFQAAAAAdAAAAABAD"
    },
    bio: {
        type: String
    }
}, { timestamps: true })

// validate password return error if less than 8 characters
userSchema.pre('save', function(next) {
    const user = this
    return new Promise(async (resolve, reject) => {
        if (user.password.length < 8) {
            let err = new Error("password length needs to be 8 characters")
            reject(err)
        } else {
            user.password = await bcrypt.hash(user.password, 12)
            next()
        }
    })
})

module.exports = mongoose.model('User', userSchema)