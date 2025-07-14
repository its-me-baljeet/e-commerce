import { ProductObj } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";
import RenderStars from "./renderStars";

type ProductCardProps = {
    productData: ProductObj;
}
export default function ProductCard({ productData }: ProductCardProps) {
    const { id, title, description, rating, price, thumbnail, category } = productData;

    return (

        <div className="w-full min-h-96 border border-gray-200 flex flex-col gap-2 tracking-wide bg-foreground rounded-sm shadow-sm">
            <Link href={`/products/${id}`}>
                <div className="relative min-w-60 min-h-72 bg-gray-500/5">
                    <Image src={thumbnail} fill alt="Image" />
                </div>
            </Link>
            <div className="px-2 pb-4 flex flex-col gap-2">
                <p className="w-fit rounded-full bg-secondary-accent-color px-3 py-1">{category}</p>
                <Link href={`/products/${id}`}>
                    <h2 className="font-semibold">{title}</h2>
                </Link>
                <p className="text-muted-text">{description}</p>
                <RenderStars rating={rating} />
                <Link href={`/products/${id}`}>
                    <p className="font-semibold text-lg">${price}</p>
                </Link>
                <AddToCartButton productData={productData} />
            </div>
        </div>
    )
}