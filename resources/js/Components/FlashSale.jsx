import { Link } from "@inertiajs/react";
import React from "react";
import Countdown from "react-countdown";

const FlashSale = ({ flashSales }) => {
    console.log("flashSales", flashSales);

    // Custom Countdown Renderer
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-gray-500 font-semibold">Expired</span>;
        }

        return (
            <div className="flex items-center gap-2">
                <span
                    className={`px-2 py-1 text-xs font-bold text-white rounded ${
                        hours === 0 && minutes < 5
                            ? "bg-red-500"
                            : "bg-gray-800"
                    }`}
                >
                    {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </span>
                {hours === 0 && minutes < 5 && (
                    <span className="text-red-500 font-bold text-xs">
                        🔥 Ending Soon!
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto py-6  ">
            <h2 className="text-xl font-bold mb-4">🔥 Flash Sale</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4   ">
                {flashSales.map((sale) => (
                    <Link
                        key={sale.id}
                        href={route("product.show", { id: sale.product_id })}
                        >
                            <div
                        key={sale.id}
                        className="p-3  border  shadow-md bg-white rounded-lg "
                    >
                        <img
                            src={sale.product.image}
                            alt={sale.product.title}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-lg mt-2 font-semibold">
                            {sale.product.title}
                        </h3>
                        <div className="flex justify-between mt-2 items-center  ">
                            {" "}
                            <p className="text-red-500 font-bold text-lg">
                                {sale.discount_percentage}% OFF
                            </p>
                            <Countdown
                                date={new Date(sale.end_time)}
                                renderer={renderer}
                            />
                        </div>
                    </div>
                        </Link>
                ))}
            </div>
        </div>
    );
};

export default FlashSale;
