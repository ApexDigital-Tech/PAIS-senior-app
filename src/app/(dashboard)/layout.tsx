import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { SOSButton } from "@/components/ui/SOSButton";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Header userName="María" />
            {children}
            <SOSButton />
            <BottomNav />
        </div>
    );
}
