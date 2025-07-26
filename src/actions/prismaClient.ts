'use server';

import prismaClient from "@/services/prisma";
import { ProductObj } from "@/types";

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