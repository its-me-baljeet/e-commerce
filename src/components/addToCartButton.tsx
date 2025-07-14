'use client';

import { useEffect, useState } from "react";
import { CartItem, ProductObj } from "@/types";

type AddToCartButtonProps = {
    productData: ProductObj;
};

export default function AddToCartButton({ productData }: AddToCartButtonProps) {
    const [label, setLabel] = useState("Add to cart");

    function handleAdd() {
        const stored = localStorage.getItem("cart");
        const prevItems: CartItem[] = stored ? JSON.parse(stored) : [];

        const existingIndex = prevItems.findIndex(item => item.id === productData.id);

        let updatedItems: CartItem[];

        if (existingIndex !== -1) {
            updatedItems = [...prevItems];
            updatedItems[existingIndex].quantity += 1;
        } else {
            updatedItems = [...prevItems, { ...productData, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setLabel("Item added to cart");
    }

    return (
        <div
            className="w-fit bg-tertiary-accent-color px-4 py-2 rounded-full text-sm cursor-pointer hover:opacity-90 transition"
            onClick={handleAdd}
        >
            {label}
        </div>
    );
}
