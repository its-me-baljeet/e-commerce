'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"

export default function SortBy() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchTerm = searchParams.get('q') || "";
    const min = searchParams.get('min') || "";
    const max = searchParams.get('max') || "";
    const minRating = searchParams.get('minRating') || "1";
    const [sortBy, setSortBy] = useState("");

    function handleSort(e: ChangeEvent<HTMLSelectElement>) {
        const sortType = e.target.value;
        let url = `/search?q=${encodeURIComponent(searchTerm)}`;
        if (min) url += `&min=${min}`;
        if (max) url += `&max=${max}`;
        if (minRating) url += `&minRating=${minRating}`;
        if (sortType) url += `&sortBy=${sortType}`;

        router.push(url);
        setSortBy(sortType);
    }
    return (
        <div className="bg-foreground shadow-sm px-3 py-1 rounded-lg text-sm">
            <label htmlFor="sort-by">Sort by :</label>
            <select name="sort-by" id="sort-by" className="outline-none" value={sortBy}
                onChange={(e) => handleSort(e)}
            >
                <option value="">Relevance</option>
                <option value="low">Price : Low to High</option>
                <option value="high">Price : High to Low</option>
            </select>
        </div>
    )
}