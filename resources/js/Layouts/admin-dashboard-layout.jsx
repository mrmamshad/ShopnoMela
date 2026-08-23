import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Search,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    Home,
    FolderTree,
    AlertTriangle,
    LogOut,
    User as UserIcon,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link, usePage, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function AdminDashboardLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [homeDropdownOpen, setHomeDropdownOpen] = useState(false); // State for dropdown
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const q = search.trim();
        if (q) {
            router.get(route("marchantlist"), { q });
        }
    };

    const { url } = usePage();
    const isActive = (href) =>
        href && href !== "#" && url.startsWith(new URL(href, window.location.origin).pathname);

    const navigation = [
        {
            name: "Home Page",
            href: "#",
            icon: Home,
            hasDropdown: true,
            children: [
                { name: "Slider", href: route("offers.index") },
                { name: "Flash Sale", href: route("flash-sales.index") },
            ],
        },
        {
            name: "All Merchants",
            href: route("marchantlist"),
            icon: LayoutDashboard,
        },
        {
            name: "All Orders",
            href: route("admin.allorders"),
            icon: ShoppingCart,
        },
        {
            name: "Merchant Orders News",
            href: route("admin.merchant.orders.news"),
            icon: FolderTree,
        },
        { name: "Users", href: route("userlist"), icon: Users },
        {
            name: "Categories",
            href: route("admin.categories"),
            icon: FolderTree,
        },
        {
            name: "Merchant Applications",
            href: route("merchant.applications.index"),
            icon: ShoppingCart,
        },
        {
            name: "Product Reports",
            href: route("admin.product-reports"),
            icon: AlertTriangle,
        },
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
                className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r 
                transform transition-transform duration-200 ease-in-out 
                lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-16 items-center gap-2 px-4 border-b">
                    <div className="flex items-center gap-2 font-semibold text-lg">
                        <div className="h-8 w-8 rounded-lg bg-primary"></div>
                        <Link href={route("admin")}>
                            Tajim Foods Admin Panel
                        </Link>
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
                                        onClick={() =>
                                            setHomeDropdownOpen(
                                                !homeDropdownOpen
                                            )
                                        }
                                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium 
                                        transition-colors hover:bg-muted focus:outline-none"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                        {homeDropdownOpen ? (
                                            <ChevronUp className="ml-auto h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-auto h-4 w-4" />
                                        )}
                                    </button>

                                    {homeDropdownOpen && (
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
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium 
                                    transition-colors hover:bg-muted ${
                                        isActive(item.href) ? "bg-muted" : ""
                                    }`}
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
                            <form
                                onSubmit={handleSearch}
                                className="flex-1 max-w-lg hidden md:block"
                            >
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search merchants..."
                                        className="pl-8 bg-background"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex mr-8 justify-end items-center gap-3">
                            {/* User menu with logout */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 rounded-full border pl-1 pr-3 py-1 hover:bg-muted transition">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                                            {(user?.name || "A")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                        <span className="hidden sm:block max-w-[120px] truncate text-sm font-medium">
                                            {user?.name || "Admin"}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {user && (
                                        <>
                                            <div className="px-4 py-2">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <hr className="my-1" />
                                        </>
                                    )}
                                    <Dropdown.Link href={route("profile.edit")}>
                                        <span className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4" />{" "}
                                            Profile
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="flex items-center gap-2 text-red-600">
                                            <LogOut className="h-4 w-4" /> Log Out
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 md:p-6 space-y-6">{children}</main>
            </div>
        </div>
    );
}
