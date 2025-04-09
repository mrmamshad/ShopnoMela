import { Link } from "@inertiajs/react";
import React from "react";
import Countdown from "react-countdown";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Custom Countdown Renderer
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span className="text-gray-500 font-semibold">Expired</span>;
    }

    return (
        <div className="bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-lg">
            {days > 0 ? `${days}d ` : ""}
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};


const FlashSale = ({ flashSales }) => {
    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🔥 Flash Sale
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {flashSales.map((sale) => (
                    <Link
                        key={sale.id}
                        href={route("product.show", { id: sale.product_id })}
                    >
                        <Card className="overflow-hidden shadow-lg w-full relative">
                            {/* Discount Badge */}
                            <Badge className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 text-xs rounded-md">
                                {sale.discount_percentage}% OFF
                            </Badge>

                            <img
                                src={sale.product.image || "/placeholder.jpg"}
                                alt={sale.product.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />

                            <CardHeader className="text-center">
                                <CardTitle className="text-lg font-semibold min-h-[48px]">
                                    {sale.product.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex justify-center">
                                <Countdown
                                    date={new Date(sale.end_time)}
                                    renderer={renderer}
                                />
                            </CardContent>

                            <CardFooter>
                                <Link
                                    href={route("product.show", {
                                        id: sale.product_id,
                                    })}
                                    className="w-full"
                                >
                                    <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                                        View Details
                                    </button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FlashSale;
