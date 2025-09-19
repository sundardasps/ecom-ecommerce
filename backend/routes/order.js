import express from "express";
import { protect } from "../middleware/auth.js";
import Order from "../models/Order.js";
import User from "../models/user.js";

const orderRouter = express.Router();

//@route POST /api/orders/my-orders
//@desc Get logged in user's orders
//@access Private

orderRouter.get("/my-orders", protect, async (req, res) => {
  try {
    // find order for the authenticated user
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    if (orders) {
      return res.status(200).json(orders);
    } else {
      return res.status(404).json({ message: "No orders found for this user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/orders/:id
// @desc Get order by ID
// @access Private

orderRouter.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //return the full order detaisls

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default orderRouter;
