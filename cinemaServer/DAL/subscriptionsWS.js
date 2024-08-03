const axios = require("axios");

const urlSubscriptions = "http://localhost:3000/subscriptions";

// Get All
const getAllSubscriptions = async () => {
  const {data: subscriptions} = await axios.get(urlSubscriptions);
  return subscriptions;
};

// Get By ID
const getSubscriptionById = (id) => {
  return axios.get(`${urlSubscriptions}/${id}`);
};

// Post
const addSubscription = (obj) => {
  axios.post(urlSubscriptions,obj)
  return "Created!";
};

// Put
const updateSubscription = (id, obj) => {
  axios.put(`${urlSubscriptions}/${id}`, obj);
  return "Updated!";
};

//Delete
const deleteSubscription = (id) => {
  axios.delete(`${urlSubscriptions}/${id}`);
  return "Deleted!";
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};

