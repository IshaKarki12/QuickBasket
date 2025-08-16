import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = "mongodb+srv://User:quickbasket123@cluster0.v4wwqz6.mongodb.net/quickbasket?retryWrites=true&w=majority&appName=Cluster0"; // replace with your Atlas string
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
