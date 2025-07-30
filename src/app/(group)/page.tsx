import Carousel from "@/components/carousel";
import HomePageProducts from "@/components/home/homePageProducts";
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
  if (!products.length) {
    return <p>No products found!</p>
  }
  // console.log("data", products)
  return (
    <div className="h-full w-full relative bg-black">
      <Carousel />
      <HomePageProducts initialProds={products}/>
    </div>
  )
}