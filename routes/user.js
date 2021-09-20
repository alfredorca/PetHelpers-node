const express = require("express");
const { populate } = require("../models/User");
const Users = require("../models/User");
const router = express.Router();

//GET ALL USERS
router.get("/", async (req, res) => {
  const users = await Users.find().populate("pets");
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Could not get users" });
  }
});

//GET Single User
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id).populate([
    {
      path: 'pets',
      model: 'Pet',
      select: 'name',
      populate: {
        path: 'name'
      }
    }
    ,{
      path: 'pets',
      model: 'Pet',
      select: 'type',
      populate: {
        path: 'type',
        model: "Species"
      }
    }
  ]);
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Could not get user" });
  }
});

//POST User
router.post("/user", async (req, res) => {
  const userToCreate = await Users.create(req.body);
  try {
    return res.status(201).json(userToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Could not post user" });
  }
});

//PUT User
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const userToUpdate = await Users.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Could not update the user" });
  }
});

//DELETE User
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  await Users.findByIdAndDelete(id);
  try {
    return res.json({ message: "User successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete user" });
  }
});

module.exports = router;
