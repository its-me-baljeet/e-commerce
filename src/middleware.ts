import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest){
    const user = req.cookies.get('user');
    const protectedPaths = ['/', '/products', '/search', '/cart'];

    const pathName = req.nextUrl.pathname;
    if(!user&&protectedPaths.includes(pathName)){
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}