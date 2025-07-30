import Header from "@/components/header";
import CartContextProvider from "@/context/cartContext";
import prismaClient from "@/services/prisma";

export default async function Layout({ children, modal }: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    const cartItems = await prismaClient.cart.findMany();

    return (
        <div className="min-h-screen w-full">
            <CartContextProvider initialCart={cartItems}>
                <Header/>
                {children}
                {modal}
                </CartContextProvider>        
        </div>
    )
}