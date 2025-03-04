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
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <motion.h1
                        className="text-3xl whitespace-nowrap sm:px-8 font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/">
                            স্বপ্ন{" "}
                            <span className="text-2xl font-semibold">Mela</span>
                        </Link>
                    </motion.h1>

                    <div className="hidden sm:flex items-center flex-1 mx-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full sm:w-[50%] px-4 ml-5 py-2 rounded-full text-gray-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Link href={route("cart")}>
                            <GiShoppingCart className="text-4xl" />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
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

                        {user ? (
                            <div className="sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
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
                                            <p className="text-center text-black my-3 text-sm">
                                                {user.name}
                                            </p>
                                            <hr className="mx-5 my-2 border-gray-400" />
                                            <Dropdown.Link
                                                href={route("myorders")}
                                            >
                                                Orders
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("cart")}>
                                                My cart
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("wishlist")}
                                            >
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
                </div>
            </header>

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
        </>
    );
}

export default Header;
