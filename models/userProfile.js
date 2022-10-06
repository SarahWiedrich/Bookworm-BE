const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const bookSchema = require('./usersBooks');

const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
    },
    savedBooks: [bookSchema]
}, { timestamps: true })

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };


module.exports = mongoose.model('User', userSchema)



// // validate password return error if less than 8 characters
// userSchema.pre('save', function(next) {
//     const user = this
//     return new Promise(async (resolve, reject) => {
//         if (user.password.length < 8) {
//             let err = new Error("password length needs to be 8 characters")
//             reject(err)
//         } else {
//             user.password = await bcrypt.hash(user.password, 12)
//             next()
//         }
//     })
// })
