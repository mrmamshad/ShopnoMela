import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href={route('contact-us')} className="hover:text-black">Contact Us</a></li>
              <li><a href="#" className="hover:text-black">Help Center</a></li>
              <li><a href="#" className="hover:text-black">How to Buy</a></li>
              <li><a href="#" className="hover:text-black">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-black">Shipping Info</a></li>
              <li><a href="#" className="hover:text-black">Track Your Order</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-black">Company Info</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
            <div className="flex gap-4">
              <img src="https://img.lazcdn.com/us/domino/dd7d3db1-047c-4e65-b89e-d710eb539976_BD-139-84.png" alt="Cash on Delivery" className="h-12" />
              <img src="https://img.lazcdn.com/us/domino/395e474e-f67e-4a29-9521-5bc693ca53df_BD-144-84.png" alt="Nogod" className="h-12" />
              <img src="https://img.lazcdn.com/us/domino/dbfdbbea-19ca-4be1-9b8f-ecb1fabdc6f7_BD-145-86.png" alt="Digital Payments" className="h-12" />
            </div>
          </div>
        </div>

        {/* Social Media & Download App */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon"><Facebook className="w-6 h-6 text-gray-700" /></Button>
              <Button variant="ghost" size="icon"><Twitter className="w-6 h-6 text-gray-700" /></Button>
              <Button variant="ghost" size="icon"><Youtube className="w-6 h-6 text-gray-700" /></Button>
              <Button variant="ghost" size="icon"><Instagram className="w-6 h-6 text-gray-700" /></Button>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Download Our App</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="px-4 py-2">Google Play</Button>
              <Button variant="outline" className="px-4 py-2">App Store</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600">
          <p>&copy; 2025 ShopnoMela. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;