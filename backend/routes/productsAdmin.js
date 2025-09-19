import express from "express";
import Product from "../models/product.js";
import { admin, protect } from "../middleware/auth.js";
const router = express.Router();


// @route GET /api/admin/products
// @desc Get all products
// @access Private/Admin


router.get("/", protect, admin, async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log("Product creation failed " + error);
        res.status(500).send("Server error");
    }
})


export default router;