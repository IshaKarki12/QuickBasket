import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // ✅ import dotenv

dotenv.config(); // ✅ Load .env file

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Get PORT from .env

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // ✅ Get Mongo URI from .env
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Failed ❌", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
