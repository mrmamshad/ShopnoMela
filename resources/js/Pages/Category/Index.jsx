import { useState } from "react";
import { Menu, X } from "lucide-react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Link } from "@inertiajs/react";

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Routers");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Sample data - replace with actual data from API
    const categories = ["Routers", "Switches", "Modems", "Access Points"];
    const brands = ["Metcusys", "Nico", "TRIS", "MIKROTIK", "Remax", "Xiaomi"];
    const promotions = ["Flash Sale", "Free Delivery", "Best Price Guaranteed"];



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Header */}
            <Header />
            <Breadcrumb className=" my-4  px-10 ">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">
                            Components
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <button
                className="lg:hidden p-2 rounded-md bg-gray-200"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="container mx-10 px-4 py-6 flex gap-6">
                {/* Sidebar */}
                <div
                    className={`absolute lg:static left-0 top-0 h-full w-64 bg-white shadow-lg transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-300 lg:w-64 lg:flex lg:flex-col space-y-6 p-4 z-50`}
                >
                    {/* Close Button for Mobile */}
                    <button
                        className="lg:hidden mb-4 p-2 rounded-md bg-gray-200 self-end"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>

                    {/* Categories */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-3">Categories</h3>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setIsSidebarOpen(false); // Close sidebar on mobile after selecting
                                }}
                                className={`block w-full text-left px-2 py-1 rounded ${
                                    selectedCategory === category
                                        ? "bg-blue-100 text-blue-600"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Brands Filter */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-3">Brand</h3>
                        {brands.map((brand) => (
                            <label
                                key={brand}
                                className="flex items-center space-x-2 mb-2"
                            >
                                <input
                                    type="checkbox"
                                    className="rounded text-blue-500"
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>

                    {/* Service & Promotion */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold mb-3">
                            Service & Promotion
                        </h3>
                        {promotions.map((promo) => (
                            <div
                                key={promo}
                                className="flex items-center space-x-2 mb-2"
                            >
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>{promo}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white p-4 rounded shadow mb-4">
                        <h1 className="text-xl font-semibold">
                            {selectedCategory}
                        </h1>
                        <p className="text-gray-600">
                            1386 items found in {selectedCategory}
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
                                
                            >
                            <Link href={route('product')} >
                            <div className="h-48 bg-gray-200 rounded mb-3"></div>
                                <h3 className="font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <div className="text-red-600 text-lg font-bold">
                                    ৳{product.price}
                                </div>
                                <div className="text-sm text-gray-500 mt-2">
                                    <span>{product.sold} sold</span>
                                    <span className="mx-2">|</span>
                                    <span className="text-yellow-500">
                                        {"★".repeat(Math.floor(product.rating))}
                                        {product.rating % 1 !== 0 && "½"}
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                        ({product.reviews})
                                    </span>
                                </div>
                            </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
