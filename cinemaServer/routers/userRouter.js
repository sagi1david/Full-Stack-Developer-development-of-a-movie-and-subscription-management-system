const express = require("express");
const userBLL = require("../BLL/userBLL");

// Entry point: http://localhost:4000/users

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userBLL.getAllUsersData();
    const data = { ...req.body.data, users };
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userBLL.getAllUserDataById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", checkToken, async (req, res) => {
  try {
    const user = req.body;
    const result = await userBLL.createNewUser(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const result = await userBLL.updateUser(id, user);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userBLL.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
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
