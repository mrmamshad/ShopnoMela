import React from "react";
import Slider from "react-slick";

const OfferSlider = () => {
    // Demo offer data
    const demoOffers = [
        {
            id: 1,
            title: "Big Sale 50% Off",
            image: "https://img.lazcdn.com/us/domino/55b2ea87-d33d-49e0-a3a8-e6b3a80eac59_BD-1976-688.jpg_2200x2200q80.jpg",
            discount: 50,
        },
        {
            id: 2,
            title: "New Year Special 30%",
            image: "https://img.lazcdn.com/us/domino/af215b52-3bc6-4933-ae38-ef32b98eedd0_BD-1976-688.jpg_2200x2200q80.jpg",
            discount: 30,
        },
        {
            id: 3,
            title: "Limited Time Deal 40%",
            image: "https://img.lazcdn.com/us/domino/eec039e9-d7bf-4b45-85e2-873416a0eb4b_BD-1976-688.jpg_2200x2200q80.jpg",
            discount: 40,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true, // Ensures the height adapts to images
        responsive: [
          {
            breakpoint: 768,
            settings: { slidesToShow: 1, slidesToScroll: 1 }
          },
        ]
      }

    return (
        <div className="w-full  max-w-6xl mx-auto py-6">
            <Slider {...settings}>
                {demoOffers.map((offer) => (
                    <div key={offer.id} className="px-2">
                        <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-full h-auto object-cover max-h-[400px] rounded-lg shadow-lg"
                        />

                        <div className="text-center mt-3">
                            <h3 className="text-lg font-semibold">
                                {offer.title}
                            </h3>
                            <p className="text-red-500">
                                Discount: {offer.discount}%
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default OfferSlider;
