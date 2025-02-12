import React from "react";
import Countdown from "react-countdown";

const flashSales = [
  {
    id: 1,
    name: "Vitamin  C Sirum",
    image: "https://img.drz.lazcdn.com/g/kf/Se64bae9524264036955e360d13fb03caB.jpg_200x200q80.jpg_.webp",
    discount: 40,
    endTime: new Date().getTime() + 3600000, // 1 hour from now
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "https://img.drz.lazcdn.com/static/bd/p/4b087baf611e81716545d146e7cf4fdc.jpg_400x400q80.jpg",
    discount: 30,
    endTime: new Date().getTime() + 7200000, // 2 hours from now
  },
  {
    id: 3,
    name: "Standing Lamp",
    image: "https://img.drz.lazcdn.com/g/kf/S1f782e4679984bd39e234d7251faeb7a2.jpg_200x200q80.jpg_.webp",
    discount: 50,
    endTime: new Date().getTime() + 5400000, // 1.5 hours from now
  },
];

const FlashSale = () => {
  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">🔥 Flash Sale</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashSales.map((sale) => (
          <div key={sale.id} className="p-4 border rounded shadow">
            <img src={sale.image} alt={sale.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg mt-2 font-semibold">{sale.name}</h3>
            <p className="text-red-500 font-bold">{sale.discount}% OFF</p>
            <Countdown date={sale.endTime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
