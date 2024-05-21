const axios = require("axios");

const urlMembers = "https://jsonplaceholder.typicode.com/users";

const getAllMembers = async () => {
  return await axios.get(urlMembers);
};

const getMemberById = async (id) => {
  return await axios.get(`${urlMembers}/${id}`);
};

module.exports = { getAllMembers, getMemberById };
