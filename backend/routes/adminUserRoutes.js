// routes/adminUserRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t return passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default router;
