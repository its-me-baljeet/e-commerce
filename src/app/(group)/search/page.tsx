import ProductCard from "@/components/productCard";
import SortBy from "@/components/sortBy";
import prismaClient from "@/services/prisma";
import { getSearchProductsData } from "@/utils/api";

type SearchPageProps = {
    searchParams: {
        q: string;
        min?: string;
        max?: string;
        minRating?: string;
        sortBy?: string;
    };
};

export function generateMetadata({ searchParams }: SearchPageProps) {
    const searchTerm = searchParams.q;
    return {
        title: "Search Page : " + searchTerm,
        description: "Search your Item"
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q?.trim().toLowerCase() || "";
    const min = parseInt(searchParams.min || "0");
    const max = parseInt(searchParams.max || "999999");
    const rating = parseInt(searchParams.minRating || "1");
    const sortBy = searchParams.sortBy || "";
    const products = await prismaClient.product.findMany({
        where:{
            title: {
                contains: query,
                mode: "insensitive"
            }
        }
    });
    let results = [...products].filter(product => {
        const matchesPrice = product.price >= min && product.price <= max;
        // const matchesRating = product.rating >= rating;

        // return matchesPrice && matchesRating;
        return matchesPrice;
    });

    if (sortBy === "low") {
        results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
        results.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="w-full p-5 flex flex-col gap-5 bg-amazon-bg">
            <section className="w-full flex justify-between">
                <h2 className="text-lg font-semibold">Showing results for: <span className="text-blue-600">{query}</span></h2>
                <SortBy />
            </section>
            <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    results.length > 0
                        ? results.map(product =>
                            <ProductCard key={product.id} productData={product} />
                        )
                        : <p>No products found matching the criteria.</p>
                }
            </section>
        </div>
    );
}
