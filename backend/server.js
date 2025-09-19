import express from "express";
import cors from "cors";
import env from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import checkoutRouter from "./routes/checkout.js";
import orderRouter from "./routes/order.js";
import uploadRouter from "./routes/upload.js";
import subscribeRouter from "./routes/subscribe.js";
import adminRouter from "./routes/admin.js";
import productAdminRouter from "./routes/productsAdmin.js";
import adminOrderRouter from "./routes/adminOrder.js";

const app = express();
app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT || 5000;

connectDB();
//API routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subscribeRouter);

//admin routes
app.use("/api/admin", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
