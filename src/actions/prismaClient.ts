'use server';

import prismaClient from "@/services/prisma";
import { ProductObj } from "@/types";
import { getProductsData } from "@/utils/api";

export async function addProductToDB(productData:ProductObj) {
    try{
        const product = await prismaClient.product.create({
            data: productData
        });
        return {
            success:true,
            data: `product saved! : ${product}`
        }
    }catch(err){
        return {
            success: false,
            message: `something went wrong : ${err}`
        }
    }
}

export async function deleteProductFromDB(productId: string){
    try{
        if(!productId)throw new Error("Id can't be empty");
        await prismaClient.product.delete({
            where:{
                id: productId
            }
        });
        return {
            success: true
        }
    }catch(err){
        console.error("error occurred:", err);
        return{
            success:false
        }
    }
}
// export async function populateDB(){
//     try{
//         const data = await getProductsData();
//         if(!data)return;
//         const productsToCreate=data.map(product => {
//             const newProduct = {
//                 title: product.title,
//                 description: product.description,
//                 category: product.category,
//                 price: product.price,
//                 discountPercentage: product.discountPercentage,
//                 thumbnail: product.thumbnail,
//                 images: product.images
//             }
//             return newProduct;
//         });

//         const resp = await prismaClient.product.createMany({
//             data: productsToCreate,
//         });
//         console.log(`Successfully created ${resp.count} products.`);
//     }catch(err){
//         console.error("error occured", err)
//     }finally{
//         await prismaClient.$disconnect();
//     }
// }