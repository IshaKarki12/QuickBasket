// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order (Logged-in users only)
router.post("/", protect, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      total += product.price * item.quantity;
      orderItems.push({ product: product._id, quantity: item.quantity });
    }

    const newOrder = new Order({
      user: req.user._id, // ✅ logged-in user
      products: orderItems,
      total,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    const populatedOrder = await savedOrder.populate([
      { path: "user", select: "name email" },
      { path: "products.product", select: "name price" },
    ]);

    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (err) {
    console.error("Order POST error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
