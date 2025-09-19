import type { preinitModule } from "react-dom";
import { Button } from "../ui/button";
import {
  CrossIcon,
  DeleteIcon,
  DollarSign,
  DollarSignIcon,
  Minus,
  Plus,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slice/cartSlice";

function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // Handling adding to substract to cart

  const handleAddToCart = (productId, delta, quatity, size, color) => {
    const newQuantity = quatity + delta;
      
  
    
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    );
  };


  return (
    <div className="flex flex-col gap-4 p-4">
      {cart.products.map((product) => (
        <div key={product.productId} className="flex  gap-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-24 object-cover mr-4 rounded"
          />
          <div className="flex flex-col justify-between gap-2">
            <h3>{product.name}</h3>
            <p className="flex gap-2 text-xs">
              <span>Size: {product.size}</span> |{" "}
              <span>Color: {product.color}</span>
            </p>
            <div className="flex gap-2 items-center justify-start  ">
              <Button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
              >
                <Minus />
              </Button>
              <p>{product.quantity}</p>
              <Button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="flex flex-col ml-auto gap-2 text-sm ">
            <p className="flex">
              {" "}
              <DollarSignIcon /> {product.price?.toLocaleString()}
            </p>{" "}
              <button
              className="text-xs text-end bg-red-600 rounded py-1 px-2"
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
              >
                Remove
              </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;
