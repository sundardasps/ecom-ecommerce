import express from "express";
const router = express.Router();
import Subscriber from "../models/subscriber.js";

// @route   POST /api/subscribe
// @desc    Subscribe a user to the newsletter
// @access  Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    return res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});


export default router;