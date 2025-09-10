import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Embedded cart item schema stored on each User
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },   // keep as string since FE uses product.id
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, required: false },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: { type: String, required: [true, "Please add an email"], unique: true },
    password: { type: String, required: [true, "Please add a password"], minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: [cartItemSchema], // ← persistent cart
  },
  { timestamps: true }
);

// hash on save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const User = mongoose.model("User", userSchema);
export default User;

