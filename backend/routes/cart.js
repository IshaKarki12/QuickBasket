// backend/routes/cartRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET cart for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { cart } = req.body;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    // Optional: validate each item has required fields
    for (const item of cart) {
      if (!item.productId || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: "Cart item missing required fields" });
      }
    }

    user.cart = cart;
    await user.save();

    res.json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error("Cart update error:", error); // log the real error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;
