const Subscription = require("../models/subscriptionsModel");

// Get All
const getAllSubscriptions = () => {
  return Subscription.find();
};

// Get By ID
const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};

// Post
const addSubscription = async (obj) => {
  const subscription = new Subscription(obj);
  await subscription.save();
  return "Created!";
};

// Put
const updateSubscription = async (id, user) => {
  await Subscription.findByIdAndUpdate(id, user);
  return "Updated!";
};

const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
  return "Deleted!";
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
