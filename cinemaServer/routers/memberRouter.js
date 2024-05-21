const express = require("express");
const jwt = require("jsonwebtoken");
const memberBLL = require("../DAL/membersWS");

// Entry point: http://localhost:4000/members

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const members = await memberBLL.getAllMembers();
    const data = { ...req.body.data, members };
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const member = memberBLL.getMemberById(id);
    const data = { ...req.body.data, member };
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", checkToken, (req, res) => {
  try {
    const obj = req.body;
    const result = memberBLL.addMember(obj);
    const data = { ...req.body.data, result };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = memberBLL.updateMember(id, obj);
    const data = { ...req.body.data, result };
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const result = memberBLL.deleteMember(id);
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
