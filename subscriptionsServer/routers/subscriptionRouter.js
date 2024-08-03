const express = require("express");
const subscriptionsDAL = require("../DAL/subscriptionDAL");

// Entry point: http://localhost:3000/subscriptions

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subscriptions = await subscriptionsDAL.getAllSubscriptions();
    return res.json(subscriptions);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionsDAL.getSubscriptionById(id);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const subscription = req.body;
    const result = await subscriptionsDAL.addSubscription(subscription);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = req.body;
    const result = await subscriptionsDAL.updateSubscription(id, subscription);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await subscriptionsDAL.deleteSubscription(id);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
