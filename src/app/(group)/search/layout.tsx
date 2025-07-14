'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchTerm = searchParams.get('q') || "";
    const minAmt = searchParams.get('min') || "";
    const maxAmt = searchParams.get('max') || "";
    const minRating = searchParams.get('minRating') || "1";

    const [min, setMin] = useState(minAmt);
    const [max, setMax] = useState(maxAmt);
    const [rating, setRating] = useState(minRating);

    let currRating = ""
    const handleGo = (currRating = rating) => {
        if (!searchTerm.trim()) return;

        let url = `/search?q=${searchTerm}`;
        if (min) url += `&min=${min}`;
        if (max) url += `&max=${max}`;
        if (currRating) url += `&minRating=${currRating}`;

        router.push(url);
    };

    return (
        <div className="min-h-[calc(100vh-60px)] w-full flex">
            <aside className="w-66 bg-amazon-bg p-5 space-y-4">
                <h2 className="font-semibold">Price</h2>
                <div className="flex flex-col space-y-2">
                    <input
                        type="number"
                        name="min"
                        value={min}
                        placeholder="Enter min value"
                        onChange={(e) => setMin(e.target.value)}
                        className="border px-2 py-1"
                    />
                    <input
                        type="number"
                        name="max"
                        value={max}
                        placeholder="Enter max value"
                        onChange={(e) => setMax(e.target.value)}
                        className="border px-2 py-1"
                    />
                    <button onClick={() => handleGo(rating)} className="bg-blue-500 text-white px-3 py-1 rounded">Go</button>
                </div>
                <div className="space-y-1">
                    <label htmlFor="rating">Min Rating</label>
                    <select
                        name="rating"
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value);
                            currRating = e.target.value;
                            handleGo(currRating);
                        }}
                        className="border px-2 py-1"
                    >
                        <option value="">Select rating</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </select>
                </div>
            </aside>
            {children}
        </div>
    );
}
