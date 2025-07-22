import Header from "@/components/header"

export default function Layout({ children ,modal}: {
    children: React.ReactNode;
    modal:React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full">
            <Header />
{modal}
            {children}
        </div>
    )
}