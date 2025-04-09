import React, { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Card } from "@/Components/ui/card";

export default function Index({ products, query }) {
    console.log("Filtering for type:", query);
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

    return (
        <div>
            <Header />

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    {/* Showing Products for Type: "{query}" */}
                    Offer related Products
                </h2>

                {/* Sorting & View Mode */}
                <div className="mb-8 flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Sort by
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("price-high-low")}>
                                Price: High to Low
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("price-low-high")}>
                                Price: Low to High
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("name-az")}>
                                Name: A to Z
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("name-za")}>
                                Name: Z to A
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid2X2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Product List */}
                <div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid grid-cols-1 gap-4"
                    }
                >
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <Card key={product.id} className="flex flex-col">
                                <img
                                    src={`/${product.image}`}
                                    alt={product.title}
                                    className="h-48 w-full object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{product.title}</h3>
                                    <p className="text-sm text-gray-600">{product.short_des}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-lg font-bold">
                                            ৳ {product.price.toLocaleString()}
                                        </p>
                                        <Link className="border shadow-sm border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded" href={route("product.show", product.id)} variant="outline">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
