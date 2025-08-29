// backend/routes/adminproductroutes.js
import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});

// GET single product by _id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
});

// POST create product
router.post("/", async (req, res) => {
  const { name, category, price, description, imageUrl, stock, featured } = req.body;
  try {
    const newProduct = new Product({ name, category, price, description, imageUrl, stock, featured });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body, // can include featured: true/false
      { new: true }
    );
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});

export default router;
