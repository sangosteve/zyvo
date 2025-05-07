// app/(main)/layout.tsx
import Sidebar from "@/components/global/sidebar";
import Header from "@/components/global/header";
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex relative h-screen">
            <Sidebar />
            <main className="flex flex-col flex-1">
                <Header />
                <div className="flex-1">
                    {children}

                </div>

            </main>

        </div>
    );
}
