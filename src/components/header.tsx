'use client'
import { ProductObj } from "@/types";
import { getAllProducts, handleLogout } from "@/utils/actions";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import AddProductDialog from "./addProductDialog";
import prismaClient from "@/services/prisma";

export default function Header() {
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState<ProductObj[]>([]);
    const [products, setProducts] = useState<ProductObj[]>([]) ;     
    useEffect(() => {
        async function getProductsList() {
            const list = await getAllProducts();
            if(!list.success)return;
            if (list.success) setProducts(list.data||[]);
        }
        getProductsList();
    }, [])
    useEffect(() => {
        if (!userInput.trim()) return;
        const results = products.filter(product => product.title.toLowerCase() === userInput.toLowerCase());
        setSuggestions(results);
    }, [userInput])
    return (
        <header>
            <nav className="w-full h-15 flex justify-between gap-5 items-center px-5 border-b border-gray-600 bg-primary-background text-light-text">
                <Link href={"/"} className="relative h-8 w-25">
                    <Image src={"/amazon.png"} fill alt="logo" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={true} />
                </Link>
                <form action="/search"
                    method="GET"
                    className="max-w-3xl border-1 border-gray-600 rounded-sm flex grow shrink overflow-hidden"
                >
                    <input type="text" value={userInput} name="q" placeholder="Search for products" className="py-2 px-4 flex grow bg-primary-foreground text-dark-text"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button type="submit" className=" px-2 bg-secondary-accent-color text-dark-text">
                        <IoIosSearch size={30} />
                    </button>
                </form>
                <div className="flex gap-5">
                    <AddProductDialog/>
                        <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
                    <Link href={"/cart"}>
                        <button className="cursor-pointer">
                            <LuShoppingCart size={25} />
                        </button>
                    </Link>
                </div>
            </nav>
            <nav className="w-full h-8 bg-accent-color text-light-text flex items-center px-5 text-sm font-medium overflow-scroll scrollbar-hide">
                <ul className="w-screen flex gap-4  whitespace-nowrap">
                    <li className="flex items-center font-bold gap-1">
                        <RxHamburgerMenu />
                        All</li>
                    <li>
                        Prime Day Deals</li>
                    <li>Fresh</li>
                    <li>

                        MX Player
                    </li>
                    <li>

                        Sell
                    </li>
                    <li>

                        Bestsellers
                    </li>
                    <li>

                        Today's Deals
                    </li>
                    Mobiles
                    <li>

                        Prime
                    </li>
                    <li>

                        Customer Service
                    </li>
                    <li>

                        New Releases
                    </li>
                    <li>

                        Fashion
                    </li>
                    <li>

                        Amazon Pay
                    </li>
                    <li>

                        Electronics
                    </li>
                    <li>

                        Home & Kitchen
                    </li>
                    <li>

                        Computers
                    </li>
                    <li>

                        Books
                    </li>
                    <li>

                        Car & Motorbike
                    </li>
                </ul>
            </nav>
        </header>
    )
}