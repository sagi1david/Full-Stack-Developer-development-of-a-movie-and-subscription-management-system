const express = require("express");
const jwt = require("jsonwebtoken");
const subscriptionsBLL = require("../DAL/subscriptionsWS");

// Entry point: http://localhost:4000/subscriptions

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const subscriptions = await subscriptionsBLL.getAllSubscriptions();
    const data = { ...req.body.data, subscriptions };
    return res.json(subscriptions);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const subscription = subscriptionsBLL.getSubscriptionById(id);
    const data = { ...req.body.data, subscription };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", checkToken, (req, res) => {
  try {
    const obj = req.body.data.obj;
    const result = subscriptionsBLL.addSubscription(obj);
    const data = { ...req.body.data, result };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body.data.obj;
    const result = subscriptionsBLL.updateSubscription(id, obj);
    const data = { ...req.body.data, result };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const result = subscriptionsBLL.deleteSubscription(id);
    const data = { ...req.body.data, result };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  const ACCESS_SECRET_TOKEN = "someKey";

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, user) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token");
    }

    const data = { obj: { ...req.body }, token: token, user: user };
    req.body.data = data;

    next();
  });
}

module.exports = router;
