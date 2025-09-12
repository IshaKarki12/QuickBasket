// backend/routes/adminUserRoutes.js
import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}, "name email isAdmin"); 
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// DELETE a user (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ✅ UPDATE user role (admin only)
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
