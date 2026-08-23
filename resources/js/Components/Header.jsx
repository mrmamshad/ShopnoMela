import { Link, useForm, usePage } from "@inertiajs/react";
import { Search, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import ActionSearchBar from "@/Components/ActionSearchBar";
import { imageSrc } from "@/lib/utils";

function Header() {
    const { auth, cartCount } = usePage().props;
    const user = auth.user;

    const searchForm = useForm({ query: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchForm.data.query.trim() !== "") {
            searchForm.get(route("products.search"));
        }
    };

    return (
        <header className="bg-green-600 text-white sticky top-0 z-40 shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0 min-w-0"
                >
                    <img
                        src="/logo/logo.png"
                        alt="Tajim Foods Products"
                        className="h-9 sm:h-11 w-auto object-contain shrink-0"
                    />
                    <div className="hidden min-[480px]:flex flex-col leading-tight min-w-0">
                        <h1 className="text-base sm:text-xl font-extrabold tracking-tight truncate">
                            Tajim{" "}
                            <span className="text-yellow-300">Foods</span>{" "}
                            Products
                        </h1>
                    </div>
                </Link>

                {/* Desktop Search Bar */}
                <div className="hidden md:flex items-center flex-1 max-w-xl">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full"
                    >
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchForm.data.query}
                            onChange={(e) =>
                                searchForm.setData("query", e.target.value)
                            }
                            className="w-full px-4 py-2.5 pr-12 rounded-full text-gray-800 border border-transparent focus:ring-2 focus:ring-yellow-300 focus:border-transparent outline-none"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 bg-green-700 text-white rounded-full flex items-center justify-center hover:bg-green-800 transition"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Cart — always visible (guests too) */}
                    <Link
                        href={route("cart")}
                        className="relative p-2 rounded-full hover:bg-green-700 transition"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold leading-none">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <>
                            <Link
                                href={route("wishlist")}
                                className="relative p-2 rounded-full hover:bg-green-700 transition"
                                aria-label="Wishlist"
                            >
                                <Heart className="w-6 h-6" />
                            </Link>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 border border-white/30 rounded-full pl-1 pr-3 py-1 hover:bg-green-700 transition">
                                        <img
                                            src={
                                                imageSrc(user.image) ||
                                                "https://ui-avatars.com/api/?name=" +
                                                    encodeURIComponent(
                                                        user.name || "U"
                                                    )
                                            }
                                            alt={user.name}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                        <span className="hidden sm:block text-sm max-w-[100px] truncate">
                                            {user.name}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <p className="text-center text-black my-3 text-sm font-medium">
                                        {user.name}
                                    </p>
                                    <hr className="mx-5 my-2 border-gray-400" />
                                    <Dropdown.Link href={route("orders")}>
                                        <span className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> Orders
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("cart")}>
                                        <span className="flex items-center gap-2">
                                            <ShoppingCart className="w-4 h-4" />{" "}
                                            My Cart
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("wishlist")}>
                                        <span className="flex items-center gap-2">
                                            <Heart className="w-4 h-4" />{" "}
                                            Wishlist
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="flex items-center gap-2 text-red-600">
                                            <LogOut className="w-4 h-4" /> Log
                                            Out
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <nav className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                            <Link
                                href={route("login")}
                                className="text-xs sm:text-sm font-medium px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full hover:bg-green-700 transition whitespace-nowrap"
                            >
                                Login
                            </Link>
                            <Link
                                href={route("register")}
                                className="text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-yellow-400 text-green-900 hover:bg-yellow-300 transition whitespace-nowrap"
                            >
                                Sign Up
                            </Link>
                        </nav>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar (with auto suggestions) */}
            <div className="md:hidden container mx-auto px-4 pb-3">
                <ActionSearchBar />
            </div>
        </header>
    );
}

export default Header;
