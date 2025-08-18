import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";
import Order from "./models/Order.js";
import User from "./models/User.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Failed ❌", err));

const seedData = async () => {
  try {
    // 1️⃣ Clear existing data
    await Product.deleteMany();
    await Order.deleteMany();
    // Keep users if you already have admin

    // 2️⃣ Insert sample products
    const products = await Product.insertMany([
      { name: "Apple", category: "Fruits", price: 100, description: "Fresh apples", stock: 50 },
      { name: "Banana", category: "Fruits", price: 50, description: "Ripe bananas", stock: 100 },
      { name: "Milk", category: "Dairy", price: 80, description: "1L Milk pack", stock: 30 },
      { name: "Bread", category: "Bakery", price: 40, description: "Whole wheat bread", stock: 20 },
      { name: "Rice", category: "Grains", price: 120, description: "1kg Rice pack", stock: 70 },
    ]);

    console.log("Products seeded ✅");

    // 3️⃣ Insert sample orders (replace userId with your admin/customer id)
    const user = await User.findOne({ email: "ishakarki302@gmail.com" }); // or any customer
    if (!user) throw new Error("User not found. Please create a user first.");

    await Order.insertMany([
      {
        user: user._id,
        products: [
          { product: products[0]._id, quantity: 2 },
          { product: products[2]._id, quantity: 1 },
        ],
        total: products[0].price * 2 + products[2].price * 1,
        status: "Pending",
      },
      {
        user: user._id,
        products: [
          { product: products[1]._id, quantity: 5 },
          { product: products[3]._id, quantity: 2 },
        ],
        total: products[1].price * 5 + products[3].price * 2,
        status: "Completed",
      },
    ]);

    console.log("Orders seeded ✅");
    process.exit();
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
};

seedData();
