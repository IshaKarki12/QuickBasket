import express from "express";
import Product from "../models/product.js"; 
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/admin/stats
// Returns total products, total orders, and total revenue
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    res.status(200).json({ totalProducts, totalOrders, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
});

// GET /api/admin/orders
// Returns latest orders
router.get("/orders", async (req, res) => {
  try {
    // Fetch latest 10 orders
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email"); // assuming order has a 'user' ref

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customerName: order.user.name,
      total: order.total,
      status: order.status,
    }));

    res.status(200).json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

export default router;
