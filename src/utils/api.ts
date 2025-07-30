// import { ProductObj } from "@/types";

// export async function getProductsData() {
//     const response = await fetch("https://dummyjson.com/products?limit=194");
//     const data = await response.json();
//     const products: ProductObj[] = data?.products || [];
//     return products;
// }
// export async function getProduct(id: number) {
//     const response = await fetch(`https://dummyjson.com/products/${id}`);
//     const data: ProductObj = await response.json();
//     return data;
// }
// export async function getSearchProductsData(q: string) {
//     const response = await fetch(`https://dummyjson.com/products/search?q=${q}`);
//     const data = await response.json();
//     const products: ProductObj[] = data?.products || [];
//     return products;
// }