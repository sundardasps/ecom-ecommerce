import express from "express";
import Checkout from "../models/Checkout.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Order from "../models/Order.js";

import { protect } from "../middleware/auth.js";
const checkoutRouter = express.Router();

// @route   POST /api/checkout
// @desc Create a new Checkout session
//@access Private

checkoutRouter.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log("checkout created for user:", req.user._id);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route PUT /api/checkout/:id/pay
// @desc  update checkout to mark as paid after succeessfull payment
// @access Privet

checkoutRouter.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route POST /api/checkout/:id/finalize
// @desc  finalize checkout and create order
// @access Privet
checkoutRouter.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      //create order
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      //Delete cart associated with user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout not paid yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});


export default checkoutRouter;