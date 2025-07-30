'use client';
import { useState } from "react"
import ProductCard from "../productCard";
import { ProductObj } from "@/types";

export default function HomePageProducts({initialProds}:{
    initialProds: ProductObj[];
}){
    const [products, setProducts]= useState(initialProds);
    const [sort, setSort] = useState('none');

    const updateItem = (data:ProductObj)=>{
      const updatedProducts = products.map(prod=>{
        if(prod.id===data.id){
          return data;
        }
        return prod;
      });
      setProducts(updatedProducts);
    }

    const deleteItem= (id:string)=>{
        const updatedItems = products.filter(prod=>prod.id!=id);
        setProducts(updatedItems);
    }

    return(
        <section className="absolute top-44 z-20 w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {
          products.map(product => {
            return (
              <div key={product.id}>
                <ProductCard productData={product} deleteItem={deleteItem} updateItem={updateItem}/>
              </div>
            )
          })
        }
      </section>
    )
}