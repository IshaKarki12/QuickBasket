import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";
import Order from "./models/Order.js";
import User from "./models/User.js";
import productsData from "./data/products.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Failed ❌", err));

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    const insertedProducts = await Product.insertMany(
      productsData.map((p) => ({
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.unit,
        imageUrl: p.image,
        stock: 100,
      }))
    );

    console.log(`${insertedProducts.length} products seeded ✅`);

    const user = await User.findOne({ email: "ishakarki302@gmail.com" });
    if (!user) throw new Error("User not found. Please create a user first.");

    await Order.create({
      user: user._id,
      products: [
        { product: insertedProducts[0]._id, quantity: 2 },
        { product: insertedProducts[1]._id, quantity: 3 },
      ],
      total: insertedProducts[0].price * 2 + insertedProducts[1].price * 3,
      status: "Pending",
    });

    console.log("Sample order created ✅");
    process.exit();
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
};

seedData();
