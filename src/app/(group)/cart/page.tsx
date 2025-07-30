'use client'

import { CartItem, CartObj } from "@/types";
import { deleteCartItem, getCartItems, updateCartItemQuantity } from "@/utils/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
    const [productsArr, setProductsArr] = useState<CartObj[]>([]);
    const subtotal = productsArr.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = productsArr.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        async function getCartProducts(){
            const resp = await getCartItems();
            if(!resp.success){
                toast.error(resp.message);
                return;
            }else{
                setProductsArr(resp.data??[]);
            }
        }
        getCartProducts();
    }, [])
    const handleDelete = async(id: string) => {
        const updatedArr = productsArr.filter(product => product.id !== id);
        setProductsArr(updatedArr);
        const resp = await deleteCartItem(id);
        if(!resp.success){
            toast.error(resp.message);
            return;
        }
        toast.success(resp.message);
    };
    const handleQuantityChange = async (id: string, quantity: number) => {
        const updated = productsArr.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setProductsArr(updated);
        const resp = await updateCartItemQuantity(id, quantity);
        if(!resp.success){
            toast.error(resp.message);
            return;
        }
        toast.success(resp.message);
    };


    if (!productsArr.length) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center bg-amazon-bg p-10">
                <div className="text-center space-y-4 bg-white p-10 rounded shadow-sm">
                    <h2 className="text-2xl font-semibold text-black">Your Amazon Cart is empty</h2>
                    <p className="text-sm text-muted">Check your saved items or browse for more products.</p>
                    <button className="bg-secondary-accent-color hover:bg-dark-gold-color text-dark-text py-2 px-4 rounded-full font-medium">
                        Continue Shopping
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen bg-amazon-bg p-4">
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Main Cart Section */}
                <section className="lg:col-span-3 bg-white rounded p-4 shadow-sm flex flex-col gap-5">
                    <div className="flex justify-between items-center border-b-2 border-amazon-bg pb-2 mb-4 text-black">
                        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                        <span className="text-[--color-muted-text] text-sm">Price</span>
                    </div>

                    <ul className="space-y-4 mb-4">
                        {
                            productsArr.map(product => {
                                return (
                                    <li key={product.id} className="flex flex-col md:flex-row gap-4 border-b-2 border-amazon-bg pb-4 text-black">
                                        <div className="relative w-28 h-28">
                                            <Image src={product.thumbnail} fill={true} alt="product Imgae" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                                        </div>
                                        <div className="flex-1 flex flex-col md:flex-row justify-between">
                                            <div className="space-y-1 flex-1">
                                                <h2 className="text-lg font-medium">{product.title}</h2>
                                                <p className="text-sm text-[--color-success-green]">In Stock</p>
                                                <p className="text-xs">Eligible for FREE Shipping</p>

                                                <div className="flex items-center flex-wrap gap-3 mt-2">
                                                    <div className="flex items-center">
                                                        <select
                                                            name="quantity"
                                                            id="quantity"
                                                            className="border border-[--color-border-color] rounded-md px-2 py-1 text-xs bg-[#F0F2F2] hover:bg-[#e3e6e6]"
                                                            value={product.quantity}
                                                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                                        >
                                                            {[1, 2, 3, 4, 5].map((q) => (
                                                                <option key={q} value={q}>
                                                                    {q}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                    <span className="text-gray-300">|</span>
                                                    <button className="text-[--color-link-blue] text-xs hover:underline hover:text-[#C7511F]"
                                                        onClick={() => handleDelete(product.id)}
                                                    >Delete</button>
                                                    <span className="text-gray-300">|</span>
                                                    <button className="text-[--color-link-blue] text-xs hover:underline hover:text-[#C7511F]">Save for later</button>
                                                    <span className="text-gray-300">|</span>
                                                    <button className="text-[--color-link-blue] text-xs hover:underline hover:text-[#C7511F]">Compare with similar items</button>
                                                </div>
                                            </div>
                                            <div className="text-right md:min-w-[80px] mt-2 md:mt-0">
                                                <p className="text-lg font-bold">${product.price}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        {/* Cart Items */}
                    </ul>

                    {/* Subtotal at Bottom */}
                    <div className="text-right text-lg py-2">
                        Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""}): <span className="font-bold">${subtotal.toFixed(2)}</span>

                    </div>
                </section>

                {/* Checkout Card */}
                <aside className="lg:col-span-1 text-black">
                    <div className="bg-white rounded p-4 shadow-sm">
                        <div className="mb-2">
                            <p className="text-[--color-success-green] text-sm flex items-start">
                                <span className="inline-block mr-1">✓</span>
                                Your order qualifies for FREE Shipping.
                                <br />Choose this option at checkout.
                            </p>
                        </div>

                        <div className="text-lg mb-3">
                            Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""}): <span className="font-bold">${subtotal.toFixed(2)}</span>

                        </div>

                        <button className="w-full hover:bg-dark-gold-color text-dark-text py-1 px-2 rounded-full text-sm font-semibold mb-2 border bg-tertiary-accent-color border-[#FCD200] shadow-sm">
                            Proceed to Buy
                        </button>

                        <div className="border border-[--color-border-color] rounded-lg mt-4 p-3 text-sm">
                            <p className="font-bold mb-2">EMI Available</p>
                            <p className="text-xs">Your order qualifies for EMI with valid credit cards</p>
                        </div>
                    </div>

                    {/* Saved for Later Section */}
                    <div className="bg-white rounded p-4 shadow-sm mt-4">
                        <h2 className="text-lg font-normal mb-2 border-b pb-1">Saved for later (0 items)</h2>
                        <p className="text-sm text-[--color-muted-text]">You haven't saved any items for later.</p>
                    </div>
                </aside>
            </section>
        </main>
    );
}