import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useForm, usePage } from "@inertiajs/react";
import { GiShoppingCart } from "react-icons/gi";
import Dropdown from "@/Components/Dropdown";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function Header() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const { toast } = useToast();


    // 🛠️ Separate useForm for Search
    const searchForm = useForm({ query: "" });

    // console.log("user", user);
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


    const { get } = useForm();

    // Handle Search Submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchForm.data.query.trim() !== "") {
            searchForm.get(route("products.search"));
        }
    };

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

    return (
        <>
<header className="bg-green-500 text-white py-4">
    <div className="container mx-0 sm;mx-auto px-4 flex items-center justify-between">
        
        {/* Left Section: Logo + Name */}
        <div className="flex items-center  justify-start -ml-7 sm:-ml-0  sm:space-x-3">
            <Link href="/" className="flex  items-center justify-start  space-x-0">
                <img src="/logo/logo.png" alt="Logo" className="w-20 h-[60px] rounded-full" />
                <span className="text-transparent text-nowrap  -ml-10 sm:-ml-0  bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500 text-4xl font-extrabold drop-shadow-lg">
                    স্বপ্ন{" "}
                    <span className="text-3xl text-white font-semibold">
                        Mela
                    </span>
                </span>
            </Link>
        </div>
        

        {/* Right Section: Search + User Dropdown */}
        <div className="flex items-center justify-end space-x-6">
            
            {/* Search Bar (hidden on mobile) */}
            <div className="hidden sm:flex items-center w-[75%]">
                 {/* 🔍 Fixed Search Form */}
                            <form onSubmit={handleSearch} className="flex items-center w-full">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 rounded-full text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-400"
                                    value={searchForm.data.query}
                                    onChange={(e) => searchForm.setData("query", e.target.value)}
                                />
                                <button type="submit" className="ml-2 px-4 py-2 bg-green-600 text-white rounded-full">
                                    🔍
                                </button>
                            </form> 
                <Link href={route("cart")} className="ml-3">
                    <GiShoppingCart className="text-4xl" />
                </Link>
            </div>

            {/* User Dropdown / Login Links */}
            <div className="flex items-center space-x-4">

                {user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center border border-transparent rounded-md text-gray-500 hover:text-gray-700">
                                <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full" />
                                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <p className="text-center text-black my-3 text-sm">{user.name}</p>
                            <hr className="mx-5 my-2 border-gray-400" />
                            <Dropdown.Link href={route("orders")}>Orders</Dropdown.Link>
                            <Dropdown.Link href={route("cart")}>My cart</Dropdown.Link>
                            <Dropdown.Link href={route("wishlist")}>Wishlist</Dropdown.Link>
                            <Dropdown.Link href={route("logout")} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href={route("login")} className="hover:underline">Login</Link></li>
                            <li><Link href={route("register")} className="hover:underline">Sign Up</Link></li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    </div>
</header>


            
        </>
    );
}

export default Header;
