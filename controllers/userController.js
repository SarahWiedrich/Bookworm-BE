const User = require('../models/userProfile')
const mongoose = require('mongoose')
const { signToken } = require('../utility/auth')

//create user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
    } catch (error) {
        res.status(400).json({ "message": String(error) })
    }
}

const loginUser = async ({ body }, res) => {
    const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }]
    });
    if (!user) {
        res.status(400).json({ message: 'Cannot find user' });
      } else {
        // Validate password
        const correctPassword = await user.isCorrectPassword(body.password);
        if (!correctPassword) {
          res.status(400).json({ message: 'Incorrect password' });
        } else {
          const token = signToken(user);
          res.json({ token, user });
        }
      }
}

module.exports = {
    createUser,
    loginUser,
}