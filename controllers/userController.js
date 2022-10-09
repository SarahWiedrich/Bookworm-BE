const User = require('../models/userProfile')
const mongoose = require('mongoose')
const { signToken } = require('../utility/auth')

//create user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(202).json({ message: "accepted" })
    } catch (error) {
        res.status(400).json({ "message": String(error) })
    }
}

//login user
const loginUser = async ({ body }, res) => {
    const user = await User.findOne({
        $or: [{ username: body.username }]
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

// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
const saveBook = async ({ user, body }, res) => {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
}
  // remove a book from `savedBooks`
const deleteBook = async ({ user, params }, res) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
}


module.exports = {
    createUser,
    loginUser,
    saveBook,
    deleteBook,
}