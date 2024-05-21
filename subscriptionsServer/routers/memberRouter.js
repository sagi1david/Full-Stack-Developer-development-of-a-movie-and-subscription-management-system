const express = require("express");
const membersDAL = require("../DAL/membersDAL");

// Entry point: http://localhost:3000/members

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members  = await membersDAL.getAllMembers();
    res.send(members);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await membersDAL.getMemberById(id);
    res.send(member);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const member = req.body;
    const result = await membersDAL.addMember(member);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = req.body;
    const result = await membersDAL.updateMember(id, member);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await membersDAL.deleteMember(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
