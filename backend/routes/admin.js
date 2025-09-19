import express from "express";

import User from "../models/user.js";

import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

// @route  GET /api/admin/users
// @desc   Get all users (admin only)
// @access Private/Admin

router.get("/users", protect, admin, async (req, res) => {
  try {
  
    
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route  POSR /api/admin/users
// @desc   Create a new user (admin only)
// @access Private/Admin
router.post("/users", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route  PUT /api/admin/users/:id
// @desc   Update a user (admin only)
// @access Private/Admin

router.put("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, role } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route  DELETE /api/admin/users/:id
// @desc   Delete a user (admin only)
// @access Private/Admin

router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
export default router;
