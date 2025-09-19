import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exist!" });

    user = new User({ name, email, password });
    await user.save();

    //Create jwt payload
    const payload = { user: { id: user._id, role: user.role } };
    //Sign and return token alogn with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        //Send the user token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //Create jwt payload
    const payload = { user: { id: user._id, role: user.role } };
    //Sign and return token alogn with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        //Send the user token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});


userRoute.get("/profile",protect,async (req,res)=>{
    res.send(req.user)
})

export default userRoute;
