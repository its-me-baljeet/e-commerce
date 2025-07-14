'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoSearchSharp } from "react-icons/io5";
import { getProductsData } from "@/utils/api";
import { ProductObj } from "@/types";

let debounceTimer: NodeJS.Timeout;

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ProductObj[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        clearTimeout(debounceTimer);
        setLoading(true);

        debounceTimer = setTimeout(async () => {
            const products = await getProductsData();
            const filtered = products.filter(p =>
                p.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setShowDropdown(true);
            setLoading(false);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    const highlightMatch = (text: string) => {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <strong key={i} >{part}</strong>
            ) : (
                part
            )
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${query}`);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full max-w-xl">
            <form onSubmit={handleSearchSubmit} className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search products"
                    className="w-full px-4 py-2 rounded-l-md text-dark-text bg-foreground"
                />
                <button
                    type="submit"
                    className="bg-secondary-accent-color px-4 py-2 rounded-r-md text-dark-text"
                >
                    <IoSearchSharp size={20} />
                </button>
            </form>

            {/* Dropdown */}
            {showDropdown && (
                <ul className="absolute w-full bg-white shadow-md z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 text-dark-text">
                    {loading ? (
                        <li className="p-2 text-center text-sm">Loading...</li>
                    ) : results.length > 0 ? (
                        results.slice(0, 6).map(product => (
                            <li
                                key={product.id}
                                onClick={() => {
                                    router.push(`/products/${product.id}`);
                                    setShowDropdown(false);
                                }}
                                className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                            >
                                {highlightMatch(product.title)}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-center text-sm text-dark-text">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
}
