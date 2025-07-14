import Carousel from "@/components/carousel";
import ProductCard from "@/components/productCard";
import { getProductsData } from "@/utils/api";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full min-h-() flex flex-col items-center bg-amazon-bg gap-5">
      <Suspense fallback={
        <div className="min-h-full p-5">
          <h1>Loading...</h1>
        </div>
      }>
        <ProductsSection />
      </Suspense>
    </main>
  );
}
export async function ProductsSection() {
  const products = await getProductsData();
  return (
    <div className="h-full w-full relative bg-black">
      <Carousel />
      <section className="absolute top-44 z-20 w-full grid grid-cols-4 gap-5 px-5">
        {
          products.map(product => {
            return (
              <div>
                <ProductCard key={product.id} productData={product} />
              </div>
            )

          })
        }
      </section>
    </div>
  )
}