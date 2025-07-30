'use client';

import { useContext, useEffect, useState } from "react";
import { CartItem, ProductObj } from "@/types";
import { CartContext } from "@/context/cartContext";
import { addProductToCart } from "@/utils/actions";
import { toast } from "sonner";

type AddToCartButtonProps = {
    productData: ProductObj;
};

export default function AddToCartButton({ productData }: AddToCartButtonProps) {
    const cartItem = {
        id: productData.id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        thumbnail: productData.thumbnail,
        quantity: 1,
    }
    const [existing, setExisting] = useState(false);

    const context = useContext(CartContext);
    if (!context) {
        throw new Error("AddToCartButton must be used within a CartContext.Provider");
    }

    const { cart, setCart } = context;

    async function handleAdd() {
        const updatedCartItems = [...cart];
        updatedCartItems.push(cartItem);
        setCart(updatedCartItems);
        const resp = await addProductToCart(cartItem);
        if (resp.success) {
            setExisting(true);
        } else {
            toast.error(resp.message);
            return;
        }
    }

    return (
        <div
            className="w-fit bg-tertiary-accent-color px-4 py-2 rounded-full text-sm cursor-pointer hover:opacity-90 transition"
            onClick={handleAdd}
        >
            {
                existing ? "added to cart" : "add to cart"
            }
        </div>
    );
}
