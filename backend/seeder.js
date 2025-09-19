import mongoose from "mongoose";

import env, { configDotenv } from "dotenv";
import user from "./models/user.js";
import products from "./data/products.js";
import product from "./models/product.js";
import cart from "./models/cart.js";



env.config();

mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
  try {
    await product.deleteMany();
    await user.deleteMany();
    await cart.deleteMany();

    const createdUser = await user.create({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });

    const userId = createdUser.id;

    const sampleProducts = products.map((products) => {
      return { ...products, user:userId };
    });

    await product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData()
