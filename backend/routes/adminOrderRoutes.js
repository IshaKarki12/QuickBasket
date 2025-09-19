// backend/routes/adminOrderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")     // ✅ get customer details
      .populate("products.product", "name price");

    res.json(orders);
  } catch (err) {
    console.error("Admin GET orders error:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (err) {
    console.error("Admin UPDATE order error:", err);
    res.status(500).json({ message: "Error updating order status" });
  }
});

export default router;
