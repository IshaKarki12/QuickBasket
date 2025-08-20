import express from "express";
import Order from "../models/Order.js";
import Product from "../models/product.js";
import User from "../models/User.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "User and products are required" });
    }

    // Calculate total
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: "Product not found" });
      total += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: userId,
      products,
      total,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get orders for a specific customer
router.get("/myorders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
