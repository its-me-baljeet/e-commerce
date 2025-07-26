import Carousel from "@/components/carousel";
import ProductCard from "@/components/productCard";
import prismaClient from "@/services/prisma";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full min-h-(calc(100vh-60px)) flex flex-col items-center bg-amazon-bg gap-5">
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
  const products = await prismaClient.product.findMany();
  if(!products.length){
    return <p>No products found!</p>
  }
  console.log("data",products)
  return (
    <div className="h-full w-full relative bg-black">
      <Carousel />
      <section className="absolute top-44 z-20 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {
          products.map(product => {
            return (
              <div key={product.id}>
                <ProductCard productData={product} />
              </div>
            )
          })
        }
      </section>
    </div>
  )
}