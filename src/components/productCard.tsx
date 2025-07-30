import { ProductObj } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";
import RenderStars from "./renderStars";
import { Trash2 } from "lucide-react";
import DeleteButton from "./deleteBtn";
import { EditProductDialog } from "./editProductDialog";

type ProductCardProps = {
    productData: ProductObj;
    deleteItem: (id: string) => void
    updateItem: (data: ProductObj) => void
}
export default function ProductCard({ productData, deleteItem, updateItem }: ProductCardProps){
    const { id, title, description, thumbnail,  price,  category } = productData;

    return (

        <div className="w-full min-h-96 border border-gray-200 flex flex-col gap-2 tracking-wide bg-foreground rounded-sm shadow-sm text-black">
            <Link href={`/products/${id}`}>
                <div className="relative min-w-60 min-h-72 bg-gray-500/5">
                    <Image src={thumbnail} fill={true} alt="Image" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
            </Link>
            <div className="px-2 pb-4 flex flex-col gap-2">
                <p className="w-fit rounded-full bg-secondary-accent-color px-3 py-1">{category}</p>
                <Link href={`/products/${id}`}>
                    <h2 className="font-semibold">{title}</h2>
                </Link>
                <p className="text-muted-text">{description}</p>
                {/* <RenderStars rating={rating} /> */}
                <Link href={`/products/${id}`}>
                    <p className="font-semibold text-lg">${price}</p>
                </Link>
                <div className="flex gap-3">
                <AddToCartButton productData={productData}/>
                <DeleteButton id={id} deleteItem={deleteItem}/>
                <EditProductDialog productData={productData} updateItem={updateItem}/>
                </div>
            </div>
        </div>
    )
}