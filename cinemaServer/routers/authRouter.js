const express = require("express");
const userDAL = require("../DAL/userDAL");
const userBLL = require("../BLL/userBLL");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Entry Point: http://localhost:4000/auth

router.post("/login", async (req, res) => {
  const users = await userDAL.getAllUsers();

  const userByUsernameAndPassword = users.find(
    (user) =>
      user.userName === req.body.username && user.password === req.body.password
  );

  try {
    // if 'Username' and 'Password' are exist in DB:
    if (userByUsernameAndPassword !== undefined) {
      const ACCESS_SECRET_TOKEN = "someKey";

      const user = await userBLL.getAllUserDataById(
        userByUsernameAndPassword.id
      );

      const accessToken = jwt.sign(user, ACCESS_SECRET_TOKEN);

      return res.send({
        accessToken: accessToken,
        user: user
      });
    }
  } catch (error) {
    res.status(401).send("Unauthorized"); // Unauthorized
  }
});

router.post("/create", async (req, res) => {
  const users = await userDAL.getAllUsers();

  const userByUserName = users.find(
    (user) => user.userName === req.body.username
  );
  try {
    // if 'Username' are exist in DB:
    if (userByUserName !== undefined) {
      console.log(userByUserName.id);

      const obj = { username: req.body.username, password: req.body.password };
      const result = await usersDAL.updateUser(userByUserName.id, obj);
      const data = { ...req.body.data, result };
      return res.status(200).send(result);
    }
    return res
      .status(200)
      .send(
        "The username does not exist in the system. Please contact the site administrator."
      );
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
