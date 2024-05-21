const express = require("express");
const subscriptionsDAL = require("../DAL/membersWS");

// Entry point: http://localhost:3000/subscriptions

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const subscriptions = subscriptionsDAL.getAllMembers();
    return res.json(subscriptions);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const subscription = subscriptionsDAL.getSubscriptionById(id);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", (req, res) => {
  try {
    const obj = req.body.data.obj;
    const result = subscriptionsDAL.addSubscription(obj);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body.data.obj;
    const result = subscriptionsDAL.updateSubscription(id, obj);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = subscriptionsDAL.deleteSubscription(id);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
