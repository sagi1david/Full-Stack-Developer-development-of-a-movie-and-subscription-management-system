const express = require("express");
const jwt = require("jsonwebtoken");
const permissionsBLL = require("../DAL/permissionsFile");

// Entry point: http://localhost:4000/permissions

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const permissions = await permissionsBLL.getPermissions();
    const data = { ...req.body.data, permissions };
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", checkToken, (req, res) => {
  try {
    const { id } = req.params;
    const permission = permissionsBLL.setPermissions(id);
    const data = { ...req.body.data, permission };
    return res.status(200).json(data);
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
