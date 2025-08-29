import express from "express";
import Order from "../models/Order.js";
import Product from "../models/product.js";

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0)
      return res.status(400).json({ message: "User and products are required" });

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
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
