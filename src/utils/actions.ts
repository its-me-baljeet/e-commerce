'use server';

import prismaClient from "@/services/prisma";
import { CartObj, UserDetails } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const users: UserDetails[] = [

];

export async function handleLogin({ email, password }: {
    email: string;
    password: string;
}) {
    const user = users.find(item => item.email === email && item.password === password);
    console.log(users);
    if (!user) {
        return {
            success: false,
            message: "Invalid Credential!"
        }
    }
    const userCookie = await cookies();
    userCookie.set('user', email)
    return { success: true, message: "Login successful!" };
}
export async function handleSignup({ email, password }: {
    email: string;
    password: string;
}) {
    const user = users.find(item => item.email != email);
    if (user) {
        return {
            success: false,
            message: "Email already taken!"
        }
    }
    const userCookie = await cookies();
    userCookie.set('user', email);
    users.push({ email, password });
    console.log(users);
    redirect('/');
}

export async function handleLogout() {
    const userCookie = await cookies();
    userCookie.delete('user');
    redirect('/login');
}

export async function getAllProducts() {
    try {
        const resp = await prismaClient.product.findMany();
        return {
            success: true,
            data: resp
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Can't get!"
        }
    }
}


export async function updateProduct(updatedProduct: {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number | null;
    thumbnail: string;
    images?: string[];
}, id: string) {
    try {
        const resp = await prismaClient.product.update({
            where: {
                id: id
            },
            data: updatedProduct,
        })
        return {
            success: true,
            message: "Updated successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: `can't update`
        }
    }
}

export async function getCartItems() {
    try {
        const cartItems = await prismaClient.cart.findMany();
        return {
            success: true,
            data: cartItems
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Can't get data Server error!"
        }
    }
}


export async function addProductToCart(productData: CartObj) {
    try {
        const existing = await prismaClient.cart.findUnique({
            where: {
                id: productData.id
            }
        });
        if (existing) {
            return {
                success: false,
                message: "Item already exists"
            }
        }
        const resp = await prismaClient.cart.create({
            data: productData
        })
        return {
            success: true,
            data: productData
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Can't add product to cart!"
        }
    }
}

export async function deleteCartItem(id: string) {
    try {
        await prismaClient.cart.delete({
            where: {
                id: id,
            }
        })
        return {
            success: true,
            message: "Item deleted Successfully!"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Can't delete item!"
        }
    }
}

export async function updateCartItemQuantity(id: string, quantity: number) {
    try {
        await prismaClient.cart.update({
            where: {
                id: id
            },
            data: {
                quantity: quantity
            }
        });
        return {
            success: true,
            message: "quantity changed!"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Can't update quantity"
        }
    }

}