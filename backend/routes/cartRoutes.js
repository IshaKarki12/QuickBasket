import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /api/cart
 * Returns the logged-in user's cart
 */
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("cart");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ cart: user.cart || [] });
  } catch (error) {
    console.error("Cart GET error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * POST /api/cart
 * Replaces the logged-in user's cart with the provided array
 * Body: { cart: [{ productId, name, price, quantity, image }] }
 */
router.post("/", protect, async (req, res) => {
  try {
    const { cart } = req.body;

    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    // basic validation per item
    for (const item of cart) {
      if (!item.productId || typeof item.price !== "number" || typeof item.quantity !== "number") {
        return res.status(400).json({ message: "Cart item missing required fields" });
      }
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = cart;
    await user.save();

    res.json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    console.error("Cart POST error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
