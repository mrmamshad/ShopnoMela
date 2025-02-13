import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { GiShoppingCart } from "react-icons/gi";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";

function Header({  }) {
    const user = usePage().props.auth.user;
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <header className="bg-green-500 text-white py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                
                <motion.h1
                    className="text-3xl whitespace-nowrap  sm:px-8 font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/"  >
                        {" "}
                        স্বপ্ন
                        <span className="text-2xl font-semibold"> Mela</span>
                    </Link>
                </motion.h1>

                <div className=" flex items-center flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className=" w-full sm:w-[50%] px-4 ml-5 py-2 rounded-full text-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link href={route("cart")}>
                        <GiShoppingCart className="text-4xl" />
                    </Link>
                </div>
                {user ? (
                    <div className=" sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent  text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <img
                                                src={user.image}
                                                alt="User Avatar"
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <p className="text-center text-black  my-3 text-sm">
                                        {user.name}
                                    </p>
                                    <hr className="mx-5 my-2 border-gray-400" />
                                    <Dropdown.Link href={route("profile.edit")}>
                                        orders
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("dashboard")}>
                                        Reviews
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("wishlist")}>
                                        Wishlist
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    href={route("login")}
                                    className="hover:underline"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("register")}
                                    className="hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
