"use client";
import { ItemType } from "@/types/ItemType";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface CartContextType {
  cartItems: ItemType[];
  addToCart: (item: ItemType) => void;
  isInCart: (item: ItemType) => boolean;
  getQuantityInCart: (item: ItemType) => number;
  increaseFromCart: (itemId: number) => void;
  decreaseFromCart: (itemId: number) => void;
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
    throw new Error("useCart is not within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ItemType[]>([]);

  const addToCart = (item: ItemType) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 0) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      }
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const isInCart = (item: ItemType) => {
    return cartItems.some((cartItem) => cartItem.id === item.id);
  };

  const getQuantityInCart = (item: ItemType) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  // Increase function
  const increaseFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Decrease function
  const decreaseFromCart = (itemId: number) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          return updatedItem;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCartItems);
  };

  const value = useMemo(() => {
    return {
      cartItems,
      addToCart,
      isInCart,
      getQuantityInCart,
      increaseFromCart,
      decreaseFromCart,
    };
  }, [cartItems, addToCart, increaseFromCart, decreaseFromCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
