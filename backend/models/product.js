import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in dev/hot-reload
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
