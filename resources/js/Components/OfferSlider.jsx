import React from "react";
import Slider from "react-slick";

const OfferSlider = ({offers}) => {


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
                {offers.map((offer) => (
                    <div key={offer.id} className="px-1">
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
