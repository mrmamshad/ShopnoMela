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
import { imageSrc, imageFallback } from "@/lib/utils";

// Custom Countdown Renderer
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return (
            <span className="text-gray-500 font-semibold text-sm">Expired</span>
        );
    }

    const pad = (n) => (n < 10 ? `0${n}` : n);

    return (
        <div className="flex items-center gap-1.5 text-sm font-semibold">
            {days > 0 && (
                <>
                    <span className="bg-gray-900 text-white px-2 py-1 rounded-md">
                        {days}
                    </span>
                    <span className="text-gray-500">d</span>
                </>
            )}
            <span className="bg-gray-900 text-white px-2 py-1 rounded-md">
                {pad(hours)}
            </span>
            <span className="text-gray-900 font-bold">:</span>
            <span className="bg-gray-900 text-white px-2 py-1 rounded-md">
                {pad(minutes)}
            </span>
            <span className="text-gray-900 font-bold">:</span>
            <span className="bg-gray-900 text-white px-2 py-1 rounded-md">
                {pad(seconds)}
            </span>
        </div>
    );
};

const FlashSale = ({ flashSales }) => {
    const activeSales = (flashSales || []).filter(
        (sale) => sale.product && new Date(sale.end_time).getTime() > Date.now()
    );

    if (activeSales.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    🔥 Flash Sale
                </h2>
                <span className="text-xs text-gray-500">
                    Limited time offers
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeSales.map((sale) => (
                    <Link
                        key={sale.id}
                        href={route("product.show", { id: sale.product_id })}
                        className="block h-full"
                    >
                        <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow w-full relative cursor-pointer h-full">
                            <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 text-xs rounded-md">
                                {sale.discount_percentage}% OFF
                            </Badge>

                            <div className="overflow-hidden">
                                <img
                                    src={
                                        imageSrc(sale.product.image) ||
                                        "/placeholder.jpg"
                                    }
                                    alt={sale.product.title}
                                    loading="lazy"
                                    decoding="async"
                                    onError={imageFallback}
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <CardHeader className="text-center pb-1">
                                <CardTitle className="text-lg font-semibold line-clamp-2 min-h-[48px]">
                                    {sale.product.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex justify-center pb-3">
                                <Countdown
                                    date={new Date(sale.end_time)}
                                    renderer={renderer}
                                />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FlashSale;
