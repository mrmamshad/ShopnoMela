import React from "react";
import Slider from "react-slick";

const Footer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <footer className="border-t mx-20 border-gray-200 py-10">
      <div className="container mx-auto">

        {/* First Row: Customer Service, About Us, Verified By */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul>
              <li><a href={route('contact-us')} className="hover:underline">Contact us</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">How to Buy</a></li>
              <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
              <li><a href="#" className="hover:underline">Shipping Information</a></li>
              <li><a href="#" className="hover:underline">Track Your Order</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul>
              <li><a href="#" className="hover:underline">Company Info</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Verified By */}
          <div>
            <h3 className="font-bold mb-4">Verified By</h3>
            <div className="grid grid-cols-2 gap-2">
              <img src="/path/to/security-certificate1.jpg" alt="Security Certificate 1" />
              <img src="/path/to/security-certificate2.jpg" alt="Security Certificate 2" />
            </div>
          </div>
        </div>

        {/* Second Row: Payment Methods */}
        <div className="mb-10">
          <h3 className="font-bold mb-4">Payment Methods</h3>
       
            <div className="flex  "  >
            <div className=" " ><img src="https://img.lazcdn.com/us/domino/dd7d3db1-047c-4e65-b89e-d710eb539976_BD-139-84.png" alt="Cash on Delivery"  width={90} /></div>
            <div><img src="https://img.lazcdn.com/us/domino/395e474e-f67e-4a29-9521-5bc693ca53df_BD-144-84.png" alt="Nogod"  width={90}  /></div>
            <div><img src="https://img.lazcdn.com/us/domino/dbfdbbea-19ca-4be1-9b8f-ecb1fabdc6f7_BD-145-86.png" alt="Digital Payments" width={90}  /></div>
        
            </div>
        </div>

        {/* Third Row: Social Media & Download App */}
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Social Media */}
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01Wdetn224xMIRNihao_!!6000000007457-2-tps-34-34.png" alt="Facebook" className="w-8 h-8" /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="https://img.lazcdn.com/us/domino/f65e9f63-e19e-4fa6-bdfd-35158b2e21d8_BD-76-76.png" alt="Twitter" className="w-8 h-8" /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><img src="https://img.lazcdn.com/us/domino/cc9e593f-adae-428c-abae-e55953feea31_BD-76-76.png" alt="YouTube" className="w-8 h-8" /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="https://img.lazcdn.com/us/domino/3f1d2d6a-1d36-4eb4-82ff-1e4511f6d293_BD-75-76.png" alt="Instagram" className="w-8 h-8" /></a>
              </div>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-bold mb-4">Download Our App</h3>
              <div className="flex space-x-4">
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                  <img src="/path/to/google-play-icon.jpg" alt="Google Play" className="w-32 h-10" />
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                  <img src="/path/to/app-store-icon.jpg" alt="App Store" className="w-32 h-10" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Last Row: Copyright */}
        <div className="text-center">
          <p>&copy; 2025 ShopnoMela. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
