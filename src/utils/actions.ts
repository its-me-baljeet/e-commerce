'use server';

import { UserDetails } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const users: UserDetails[] = [

];

export async function handleLogin({email, password}:{
    email: string;
    password: string;
}){
    const user = users.find(item=>item.email===email&&item.password===password);
    console.log(users);
    if(!user){
        return {
            success: false,
            message: "Invalid Credential!"
        }
    }
    const userCookie = await cookies();
    userCookie.set('user', email)
    return {success: true, message:"Login successful!"};
}
export async function handleSignup({email, password}:{
    email: string;
    password: string;
}){
    const user = users.find(item=>item.email!=email);
    if(user){
        return {
            success: false,
            message: "Email already taken!"
        }
    }
    const userCookie = await cookies();
    userCookie.set('user', email);
    users.push({email, password});
    console.log(users);
    redirect('/');
}

export async function handleLogout(){
    const userCookie = await cookies();
    userCookie.delete('user');
    redirect('/login');
}