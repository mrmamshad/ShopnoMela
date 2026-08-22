import { Link } from "@inertiajs/react";
import React from "react";
import Slider from "react-slick";
import { imageSrc, imageFallback } from "@/lib/utils";

const OfferSlider = ({ offers }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    if (!offers || offers.length === 0) {
        return null;
    }

    return (
        <div className="w-full sm:max-w-6xl mx-auto py-6">
            <Slider {...settings}>
                {offers.map((offer) => (
                    <Link
                        key={offer.id}
                        href={
                            route("products.filter") +
                            `?types=${encodeURIComponent(offer.types)}`
                        }
                    >
                        <div className="px-1">
                            <div className="relative overflow-hidden rounded-xl shadow-lg group">
                                <img
                                    src={imageSrc(offer.image)}
                                    alt={offer.title}
                                    loading="lazy"
                                    decoding="async"
                                    onError={imageFallback}
                                    className="w-full h-auto object-cover max-h-[400px] rounded-xl group-hover:scale-105 transition-transform duration-500"
                                />
                                {offer.discount > 0 && (
                                    <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                                        {offer.discount}% OFF
                                    </span>
                                )}
                            </div>
                            <div className="text-center mt-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {offer.title}
                                </h3>
                                <p className="text-red-500 text-sm font-medium">
                                    Discount: {offer.discount}%
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default OfferSlider;
