import express from "express";
import Contact from "../models/Contact.js"; // your contact model
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all contact messages (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// ✅ Delete a message
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }
    await contact.deleteOne();
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message" });
  }
});

export default router;
