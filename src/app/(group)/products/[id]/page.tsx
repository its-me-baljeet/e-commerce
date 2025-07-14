import AddToCartButton from "@/components/addToCartButton";
import RenderStars from "@/components/renderStars";
import { getProduct, getProductsData } from "@/utils/api";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProductPageProps = {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params }: ProductPageProps) {
    const id = params.id;
    const product = await getProduct(Number(id));
    return {
        title: product.id ? product.title : "Product not Found",
        description: product?.description,
    }
}
export default async function ProductPage({ params }: ProductPageProps) {
    const id = params.id;
    const product = await getProduct(Number(id));
    if (!product.id) notFound();
    const { title, description, rating, price, thumbnail, category, images } = product;
    return (
        <main className="h-full w-full p-5 flex gap-10 ">
            <section className="relative w-6xl h-[60vh] bg-gray-100">
                <Image src={thumbnail} fill alt="product Image" />
            </section>
            <section className="w-full h-full">
                {
                    images.map((image) => {
                        console.log(image)
                        return (
                            <div key={id} className="relative h-15 w-25">
                                <Image src={`${image}`} fill={true} alt="Product Image" />
                            </div>)
                    })
                }
            </section>
            <section className="flex flex-col gap-5">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <RenderStars rating={rating} />
                <h2 className="text-3xl font-bold">${price}</h2>
                <p>{category}</p>
                <hr />
                <h2 className="text-muted-text text-xl font-semibold tracking-tight">Product Details</h2>
                <p className="text-muted-text text-sm/relaxed tracking-widest">
                    {description}
                </p>
                <AddToCartButton productData={product} />
            </section>
        </main>
    )
}