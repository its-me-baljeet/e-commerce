'use client'
import { CartObj } from "@/types";
import { createContext, useState } from "react";

type CartContextType = {
  cart: CartObj[];
  setCart: React.Dispatch<React.SetStateAction<CartObj[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({ children, initialCart }: {
    children: React.ReactNode;
    initialCart: CartObj[];
}) {

    const [cart, setCart] = useState<CartObj[]>([]);

    return (
        <div className="min-h-screen w-full">
            <CartContext.Provider value={{
                cart, setCart
            }}>
                {children}
            </CartContext.Provider>
        </div>
    )
}