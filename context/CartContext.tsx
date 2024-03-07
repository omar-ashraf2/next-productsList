"use client";
import { ItemType } from "@/types/ItemType";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface CartContextType {
  cartItems: ItemType[];
  addToCart: (item: ItemType) => void;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: ItemType) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setTotal(total + 1);
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const value = useMemo(() => {
    return {
      cartItems,
      addToCart,
      total,
    };
  }, [cartItems, addToCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
