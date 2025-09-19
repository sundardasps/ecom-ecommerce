import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import CartContents from "../cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function CartSheet({cart}) {
  const { user, guestId } = useSelector((state) => state.auth);
 

  const userId = user ? user._id : null;

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false); // close sheet
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };



  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  
    
    

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      {/* Cart drawer */}
      <SheetContent className="w-full md:w-1/2 max-w-2xl bg-white flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-grow overflow-y-auto">
          {cart && cart?.products?.length > 0 ? (
            <CartContents cart={cart}  userId={userId} guestId={guestId} />
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="flex flex-col gap-2 mt-4">
          {cart && cart?.products?.length > 0 ? (
            <>
              <Button
                onClick={handleCheckout}
                className="bg-gray-800 text-white"
              >
                Checkout
              </Button>
              <p className="text-sm text-gray-500">
                Shipping, taxes, and discounts calculated at checkout.
              </p>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
