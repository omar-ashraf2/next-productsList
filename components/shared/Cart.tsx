"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import { truncateString } from "@/lib/utils";
import { MinusIcon, PlusIcon, ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cartItems, increaseFromCart, decreaseFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  };

  // Function to handle increase quantity
  const handleIncreaseQuantity = (itemId: number) => {
    increaseFromCart(itemId);
  };

  // Function to handle decrease quantity
  const handleDecreaseQuantity = (itemId: number) => {
    decreaseFromCart(itemId);
  };

  // Calculate total price when cartItems change
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="relative">
      <Drawer>
        <div className="absolute w-5 h-5 -top-2 -right-2 z-10 bg-red-400 rounded-full text-xs flex justify-center items-center">
          <span className="text-white">{cartItems.length}</span>
        </div>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <ShoppingBasketIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent totalprice={totalPrice}>
          {cartItems.length === 0 ? (
            <div className=" uppercase text-muted-foreground">
              Cart is empty, please add items
            </div>
          ) : (
            cartItems?.map((item) => (
              <div key={item.id} className="w-full max-w-[300px]">
                <DrawerHeader>
                  <DrawerTitle>{truncateString(item.title, 20)}</DrawerTitle>
                  <DrawerDescription>
                    {truncateString(item.description, 30)}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <MinusIcon />
                    </Button>
                    <div className="flex-[0.5] text-center">
                      <div className="w-[200px] h-[200px] relative mx-auto mb-4">
                        <Image
                          src={item.image}
                          alt="itemImage"
                          fill
                          className="object-contain"
                          sizes="(max-width: 100%)"
                        />
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        You have ordered: {item.quantity}
                        {item.quantity === 1 ? " unit" : " units"} for $
                        {Number(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Cart;
