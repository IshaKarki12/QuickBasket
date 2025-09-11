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

export default router;
