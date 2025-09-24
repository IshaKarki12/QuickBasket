// backend/routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public route - user submits contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact POST error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// ✅ Admin route - get all messages
router.get("/", protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// ✅ Admin route - delete a message
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    await contact.deleteOne();
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message" });
  }
});

export default router;
