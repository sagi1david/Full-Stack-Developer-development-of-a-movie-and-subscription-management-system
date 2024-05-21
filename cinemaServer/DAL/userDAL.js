const User = require('../models/userModel');

// Get All
const getAllUsers = (filters) => {
  return User.find(filters);
};

// Get By ID
const getUserById = (id) => {
  return User.findById(id);
};

// Post
const addUser = async (obj) => {
  const user = new User(obj);
  const newUser = await user.save();
  return newUser.id;
};

// Put
const updateUser = async (id, user) => {
  await User.findByIdAndUpdate(id, user);
  return 'Updated!';
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
