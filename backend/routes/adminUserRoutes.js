// backend/routes/adminUserRoutes.js
import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/// GET all users (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ADD a new user (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,  // 🔑 password should be hashed by your User model's pre-save middleware
      role: role || "user", // default role = user
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// DELETE a user (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// UPDATE user role (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = req.body.role || user.role;
    const updatedUser = await user.save();

    res.json({ _id: updatedUser._id, role: updatedUser.role });
  } catch (err) {
    res.status(500).json({ message: "Error updating user role" });
  }
});

export default router;
