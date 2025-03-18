import React from "react";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";

const Footer = () => {
    const [openModal, setOpenModal] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("merchant.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setOpenModal(false);
                toast({
                    title: "Successfuly applied ",
                    description: "Applied for merchant successfully!",
                    variant: "default",
                });
            },
        });
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        store_name: "",
        cover_photo: null,
        profile_photo: null,
        description: "",
        contact_email: "",
        contact_phone: "",
        facebook: "",
        instagram: "",
        twitter: "",
    });
    const handleFileChange = (field, e) => {
        setData(field, e.target.files[0]);
    };

    return (
        <footer className="border-t border-gray-200 py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Customer Service
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a
                                    href={route("contact-us")}
                                    className="hover:text-black"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    How to Buy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Returns & Refunds
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Track Your Order
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">About Us</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Company Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Payment Methods */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Payment Methods
                        </h3>
                        <div className="flex gap-4">
                            <img
                                src="https://img.lazcdn.com/us/domino/dd7d3db1-047c-4e65-b89e-d710eb539976_BD-139-84.png"
                                alt="Cash on Delivery"
                                className="h-12"
                            />
                            <img
                                src="https://img.lazcdn.com/us/domino/395e474e-f67e-4a29-9521-5bc693ca53df_BD-144-84.png"
                                alt="Nogod"
                                className="h-12"
                            />
                            <img
                                src="https://img.lazcdn.com/us/domino/dbfdbbea-19ca-4be1-9b8f-ecb1fabdc6f7_BD-145-86.png"
                                alt="Digital Payments"
                                className="h-12"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media & Download App */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon">
                                <Facebook className="w-6 h-6 text-gray-700" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Twitter className="w-6 h-6 text-gray-700" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Youtube className="w-6 h-6 text-gray-700" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Instagram className="w-6 h-6 text-gray-700" />
                            </Button>
                        </div>
                    </div>

                    {/* Download App */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Download Our App
                        </h3>
                        <div className="flex space-x-4">
                            <Button variant="outline" className="px-4 py-2">
                                Google Play
                            </Button>
                            <Button variant="outline" className="px-4 py-2">
                                App Store
                            </Button>
                        </div>
                    </div>
                    {user &&
                        user.roles.includes("customer") &&
                        !user.roles.includes("admin") &&
                        !user.roles.includes("merchant") && (
                            <Button
                                variant="outline"
                                onClick={() => setOpenModal(true)}
                                className="text-black"
                            >
                                Become a Seller
                            </Button>
                        )}
                                          {user &&
                        user.roles.includes("merchant") &&
                        !user.roles.includes("admin") &&
                         (
                            <Link
                                variant="outline"
                                href={route("marchant")}
                                className="text-black border border-gray-300 px-4 mx-auto py-2"
                            >
                              Marchant Dashboard
                            </Link>
                        )}
                        {user &&
                        user.roles.includes("admin") && (
                            <Link
                                variant="outline"
                                href={route("admin")}
                                className="text-black border border-gray-300 px-4 mx-auto py-2"
                            >
                                Admin Dashboard
                            </Link>
                        )}  
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-600">
                    <p>&copy; 2025 ShopnoMela. All rights reserved.</p>
                </div>
            </div>
            {/* Become a Seller Modal */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                {/* 
                    Added w-full and extra bottom padding. 
                    This ensures the content can scroll and the buttons aren’t hidden.
                */}
                <DialogContent className="w-full sm:max-w-lg max-h-[70vh]  sm:max-h-[90vh]  overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Apply to Become a Seller</DialogTitle>
                        <DialogDescription>
                            Please fill in your store details to create your
                            merchant profile.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 pb-20" // extra bottom padding
                    >
                        <div>
                            <Label>Store Name</Label>
                            <Input
                                type="text"
                                value={data.store_name}
                                onChange={(e) =>
                                    setData("store_name", e.target.value)
                                }
                                placeholder="Your store name"
                                required
                            />
                            {errors.store_name && (
                                <p className="text-red-500 text-sm">
                                    {errors.store_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Cover Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange("cover_photo", e)
                                }
                                required
                            />
                            {errors.cover_photo && (
                                <p className="text-red-500 text-sm">
                                    {errors.cover_photo}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Profile Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange("profile_photo", e)
                                }
                                required
                            />
                            {errors.profile_photo && (
                                <p className="text-red-500 text-sm">
                                    {errors.profile_photo}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="A short description about your store"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Contact Email</Label>
                            <Input
                                type="email"
                                value={data.contact_email}
                                onChange={(e) =>
                                    setData("contact_email", e.target.value)
                                }
                                placeholder="your-email@example.com"
                                required
                            />
                            {errors.contact_email && (
                                <p className="text-red-500 text-sm">
                                    {errors.contact_email}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Contact Phone</Label>
                            <Input
                                type="text"
                                value={data.contact_phone}
                                onChange={(e) =>
                                    setData("contact_phone", e.target.value)
                                }
                                placeholder="+1234567890"
                                required
                            />
                            {errors.contact_phone && (
                                <p className="text-red-500 text-sm">
                                    {errors.contact_phone}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Facebook</Label>
                            <Input
                                type="text"
                                value={data.facebook}
                                onChange={(e) =>
                                    setData("facebook", e.target.value)
                                }
                                placeholder="Facebook URL"
                            />
                            {errors.facebook && (
                                <p className="text-red-500 text-sm">
                                    {errors.facebook}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Instagram</Label>
                            <Input
                                type="text"
                                value={data.instagram}
                                onChange={(e) =>
                                    setData("instagram", e.target.value)
                                }
                                placeholder="Instagram URL"
                            />
                            {errors.instagram && (
                                <p className="text-red-500 text-sm">
                                    {errors.instagram}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Twitter</Label>
                            <Input
                                type="text"
                                value={data.twitter}
                                onChange={(e) =>
                                    setData("twitter", e.target.value)
                                }
                                placeholder="Twitter URL"
                            />
                            {errors.twitter && (
                                <p className="text-red-500 text-sm">
                                    {errors.twitter}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                    <DialogClose asChild></DialogClose>
                </DialogContent>
            </Dialog>
        </footer>
    );
};

export default Footer;
