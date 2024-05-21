const axios = require("axios");

const urlMembers = "http://localhost:3000/members";

// Get All
const getAllMembers = async () => {
  const {data: members} = await axios.get(urlMembers);
  return members
};

// Get By ID
const getMemberById = (id) => {
  return axios.get(`${urlMembers}/${id}`);
};

// Post
const addMember = (obj) => {
  axios.post(urlMembers, obj);
  return "Created!";
};

// Put
const updateMember = (id, obj) => {
  axios.put(`${urlMembers}/${id}`, obj);
  return "Updated!";
};

//Delete
const deleteMember = (id) => {
  axios.delete(`${urlMembers}/${id}`);
  return "Deleted!";
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
