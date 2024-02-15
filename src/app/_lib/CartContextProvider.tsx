"use client";
import { createContext, useEffect, useState } from "react";
import { getCartItems } from "../_actions/getCartItems";

interface CartContextData {
  cartCounter: number;
  setCartCounter: (val: number) => void;
}

export const CartContext = createContext<CartContextData | null>(null);

interface CartContextProviderProps {
  children: JSX.Element[];
}
function CartContextProvider(props: CartContextProviderProps) {
  const [cartCounter, setCartCounter] = useState<number>(0);
  const getItems = async () => {
    const items = await getCartItems();
    if (!items) return;
    setCartCounter(items);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCounter: cartCounter,
        setCartCounter: (val: number) => {
          setCartCounter(val);
        },
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
