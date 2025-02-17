import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function Index({ category, products }) {
    console.log("category", category);
    console.log("products", products);

    const [sortBy, setSortBy] = useState("price-high-low");
    const [viewMode, setViewMode] = useState("grid");

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case "price-high-low":
                    return b.price - a.price;
                case "price-low-high":
                    return a.price - b.price;
                case "name-az":
                    return a.title.localeCompare(b.title);
                case "name-za":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }, [sortBy, products]);

    const handleViewModeChange = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid");
    };

    return (
        <div>
            <Header />

            {/* Category Title & Image */}
            <div className="container mx-auto px-4 md:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8">
                    {/* Image Container with Aspect Ratio */}
                    <div className="relative w-full sm:w-64 md:w-64 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={`/${category.categoryImg}`}
                            alt={category.categoryName}
                            className="w-full h-48 object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent hidden md:block" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
                        {category.categoryName}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Sorting & View Mode */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Sort by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setSortBy("price-high-low")}
                                >
                                    Price: High to Low
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortBy("price-low-high")}
                                >
                                    Price: Low to High
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortBy("name-az")}
                                >
                                    Name: A to Z
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSortBy("name-za")}
                                >
                                    Name: Z to A
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex gap-2">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid2X2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "outline"
                                }
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                {/* Product List */}
                <div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid grid-cols-1 gap-4"
                    }
                >
                    {sortedProducts.map((product) => (
                        <Card
                            key={product.id}
                            className={
                                viewMode === "list"
                                    ? "flex flex-col"
                                    : "flex flex-col"
                            } // Flex column for list view
                        >
                            <div
                                className={
                                    viewMode === "list" ? "w-48 shrink-0" : ""
                                }
                            >
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.title}
                                    className="h-48 w-full object-cover rounded-t-lg"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-4">
                                <div>
                                    <h3 className="font-semibold text-base line-clamp-2 mb-2">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                        {product.short_des}
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-bold">
                                            ৳ {product.price.toLocaleString()}
                                        </p>
                                        {product.discount > 0 && (
                                            <p className="text-sm text-red-500">
                                                Discount: {product.discount}%
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                            as={Link}
                                            href={`/product/${product.id}`}
                                            variant="outline"
                                    >
                                        <Link
                                            href={route(
                                                "product.show",
                                                product.id
                                            )}
                                            variant="outline"
                                        >
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
