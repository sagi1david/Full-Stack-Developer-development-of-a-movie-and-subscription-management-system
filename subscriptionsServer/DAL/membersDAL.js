const Member = require("../models/membersModel");

// Get All
const getAllMembers = () => {
  return Member.find();
};

// Get By ID
const getMemberById = (id) => {
  return Member.findById(id);
};

// Post
const addMember = async (obj) => {
  const member = new Member(obj);
  await member.save();
  return "Created!";
};

// Put
const updateMember = async (id, member) => {
  await Member.findByIdAndUpdate(id, member);
  return "Updated!";
};

const deleteMember = async (id) => {
  await Member.findByIdAndDelete(id);
  return "Deleted!";
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
