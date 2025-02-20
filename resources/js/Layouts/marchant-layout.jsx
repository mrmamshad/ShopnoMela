import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Settings,
    HelpCircle,
    Bell,
    Search,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MdStorefront } from "react-icons/md";
import { RiProductHuntFill } from "react-icons/ri";
import { MdReport } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { Link } from "@inertiajs/react";

export default function MarchantDashboardLayout({ children, marchantuser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false); // Dropdown state

    const navigation = [
        { name: "Store", href: route("merchant.store.edit"), icon: MdStorefront, current: true },
        {
            name: "Products",
            href: "#",
            icon: RiProductHuntFill,
            current: false,
            hasDropdown: true,
            children: [
                { name: "All Products", href: route("merchant.products.index") },
                { name: "Add Product", href: route("merchant.products.create") },
            ],
        },
        { name: "Reports", href: "#", icon: MdReport, current: false },
        { name: "Reviews", href: "#", icon: MdOutlineRateReview, current: false },
        { name: "Help", href: "#", icon: HelpCircle, current: false },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r
                    transform transition-transform duration-200 ease-in-out
                    lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex h-16 items-center gap-2 px-4 border-b">
                    <div className="flex items-center gap-2 font-semibold text-lg">
                        <div className="h-8 w-8 rounded-lg bg-primary"></div>
                        <Link href={route("marchant")}>Marchant {marchantuser?.name.split(" ")[0]}</Link>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navigation.map((item) => (
                        <div key={item.name}>
                            {item.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted focus:outline-none"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                        {productsDropdownOpen ? (
                                            <ChevronUp className="ml-auto h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-auto h-4 w-4" />
                                        )}
                                    </button>

                                    {productsDropdownOpen && (
                                        <div className="pl-8 space-y-1">
                                            {item.children.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${item.current ? "bg-muted" : ""}`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="sticky top-0 z-40 h-16 border-b bg-card">
                    <div className="flex h-full items-center gap-4 px-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <div className="flex flex-1 items-center gap-4">
                            <form className="flex-1 max-w-lg hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="pl-8 bg-background"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex mr-8 justify-end items-center gap-3">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 md:p-6 space-y-6">{children}</main>
            </div>
        </div>
    );
}
