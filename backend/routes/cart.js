import express from "express";
import { admin, protect } from "../middleware/auth.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import cart from "../models/cart.js";

const cartRouter = express.Router();

//Helper function to get or create cart based on userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  }
};

//@route POST /api/cart
//@desc Add product to the cart for the gust or user
//@access Public

cartRouter.post("/", async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine cart owner
    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color === color &&
          p.size === size
      );

      if (productIndex > -1) {
        // ✅ If product exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // ✅ If product does not exist, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          color,
          size,
          quantity,
        });
      }

      // ✅ Always recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // ✅ Create a new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            color,
            size,
            quantity,
          },
        ],
        totalPrice: quantity * product.price,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log("Product creation failed " + error);
    res.status(500).send("Server error");
  }
});

//@route PUT /api/cart
//@desc Update product quantity in the cart for the guest or user
//@access Public

cartRouter.put("/", async (req, res) => {
  const { productId, quantity, color, size, guestId, userId } = req.body;

  try {
    let Cart = await getCart(userId, guestId);

    if (!Cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = Cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        Cart.products[productIndex].quantity = quantity;
      } else {
        Cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }

      cart.totalPrice = Cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await Cart.save();
      return res.status(200).json(Cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Product creation failed " + error);
    res.status(500).send("Server error");
  }
});

//@route DELETE /api/cart
//@desc Clear the cart for the guest or user
//@access Public

cartRouter.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let Cart = await getCart(userId, guestId);
    if (!Cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = Cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );
    if (productIndex > -1) {
      Cart.products.splice(productIndex, 1); // Remove product if quantity is 0

      cart.totalPrice = Cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await Cart.save();
      return res.status(200).json(Cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Product creation failed " + error);
    res.status(500).send("Server error");
  }
});

export default cartRouter;

// @route GET /api/cart
// @desc Get cart  for the guest or user
// @access Public

cartRouter.get("/", async (req, res) => {
  const { guestId, userId } = req.query;
  try {

    
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    return res.status(200).json(cart);
  } catch (error) {
    console.log("Product creation failed " + error);
    res.status(500).send("Server error");
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart upon login
// @access Public

cartRouter.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId: guestId });
    const userCart = await Cart.findOne({ user: req.user.id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res
          .status(400)
          .json({ message: "Guest cart is empty, nothing to merge" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestProduct.productId.toString() &&
              p.color === guestProduct.color &&
              p.size === guestProduct.size
          );

          if (productIndex > -1) {
            // If product exists in user cart, update quantity
            userCart.products[productIndex].quantity += guestProduct.quantity;
          } else {
            // If product does not exist, add it
            userCart.products.push(guestProduct);
          }
        });

        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();
        try {
          await Cart.findByIdAndDelete(guestCart._id);
        } catch (error) {
          console.log("Failed to delete guest cart: " + error);
        }
        return res.status(200).json(userCart);
      } else {
        // If user cart does not exist, assign guest cart to user
        guestCart.user = req.user.id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // If no guest cart but user cart exists, return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "No cart to merge" });
    }
  } catch (error) {
    console.log("Product creation failed " + error);
    res.status(500).send("Server error");
  }
});
