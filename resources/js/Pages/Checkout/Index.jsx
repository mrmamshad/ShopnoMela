import { usePage, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
    const { toast } = useToast();
    const {
        product,
        selectedColor,
        selectedSize,
        quantity,
        price,
        shippingDetails,
        shippingFee,
        totalAmount,
    } = usePage().props;
    const [openDrawer, setOpenDrawer] = useState(false);
    console.log("Shipping details:", shippingDetails);

    // Form handling using useForm, now only with the new table columns
    const { data, setData, post, processing } = useForm({
        cus_name: "",
        cus_phone: "",
        ship_name: "",
        ship_add: "",
        ship_city: "",
        ship_state: "",
    });

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("shipping.store"), {
            onSuccess: () => {
                setOpenDrawer(false);
                toast({
                    title: "Success",
                    description: "Shipping address added successfully!",
                    variant: "default",
                });
            },
        });
    };

    const handlePayment = () => {
        post(route("pay"), {
            data: {
                amount: totalAmount,
                cus_name: shippingDetails.name,
                cus_phone: shippingDetails.phone,
                ship_name: shippingDetails.name,
                ship_add: shippingDetails.address,
                ship_city: shippingDetails.city,
                ship_state: shippingDetails.state,
                product_name: product.title,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize,
            },
            onSuccess: (response) => {
                if (response.redirect_url) {
                    window.location.href = response.redirect_url;
                }
            },
        });
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Section - Shipping Details */}
                    <div className="md:col-span-2">
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Shipping & Billing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border-0 rounded-lg p-4">
                                    <h2 className="text-lg font-semibold">
                                        Name: {shippingDetails.name}
                                    </h2>
                                    <p className="text-gray-500">
                                        Mobile: {shippingDetails.phone}
                                    </p>
                                    <div className="flex gap-4 ">
                                        <span>Shipping Address:</span>
                                        <p className="text-gray-500">
                                            {shippingDetails.address} -{" "}
                                        </p>
                                        <p className="text-gray-500">
                                            {shippingDetails.city}-
                                        </p>
                                        <p className="text-gray-500">
                                            {shippingDetails.state}
                                        </p>
                                    </div>

                                    {/* Show Add Address button if no address exists */}
                                    {(!shippingDetails.ship_add ||
                                        shippingDetails.ship_add ===
                                            "No address available") && (
                                        <Drawer
                                            open={openDrawer}
                                            onOpenChange={setOpenDrawer}
                                        >
                                            <DrawerTrigger asChild>
                                                <Button className="mt-3 bg-blue-500 text-white">
                                                    Add Shipping Address
                                                </Button>
                                            </DrawerTrigger>
                                            <DrawerContent>
                                                <DrawerHeader>
                                                    <DrawerTitle>
                                                        Add Shipping Address
                                                    </DrawerTitle>
                                                </DrawerHeader>
                                                <form
                                                    onSubmit={handleSubmit}
                                                    className="p-4 space-y-3"
                                                >
                                                    <div>
                                                        <Label htmlFor="cus_name">
                                                            Full Name
                                                        </Label>
                                                        <Input
                                                            id="cus_name"
                                                            value={
                                                                data.cus_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "cus_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="cus_phone">
                                                            Phone
                                                        </Label>
                                                        <Input
                                                            id="cus_phone"
                                                            value={
                                                                data.cus_phone
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "cus_phone",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="ship_name">
                                                            Shipping Name
                                                        </Label>
                                                        <Input
                                                            id="ship_name"
                                                            value={
                                                                data.ship_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ship_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Product receiver name"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="ship_add">
                                                            Address
                                                        </Label>
                                                        <Input
                                                            id="ship_add"
                                                            value={
                                                                data.ship_add
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ship_add",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="ship_city">
                                                            City
                                                        </Label>
                                                        <Input
                                                            id="ship_city"
                                                            value={
                                                                data.ship_city
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ship_city",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="ship_state">
                                                            State
                                                        </Label>
                                                        <Input
                                                            id="ship_state"
                                                            value={
                                                                data.ship_state
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ship_state",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        className="w-full bg-green-500"
                                                        disabled={processing}
                                                    >
                                                        Save Address
                                                    </Button>
                                                </form>
                                            </DrawerContent>
                                        </Drawer>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Package Details */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Package 1 of 1</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue="standard">
                                    <div className="flex items-center space-x-3 border p-3 rounded-lg">
                                        <RadioGroupItem
                                            value="standard"
                                            id="standard"
                                        />
                                        <label
                                            htmlFor="standard"
                                            className="text-sm font-medium"
                                        >
                                            <p>
                                                ৳ {shippingFee} Standard
                                                Delivery
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Get by 23-26 Feb
                                            </p>
                                        </label>
                                    </div>
                                </RadioGroup>

                                {/* Product Details */}
                                <div className="flex gap-4 mt-4">
                                    <img
                                        src={`${product.image}`}
                                        alt={product.title}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="text-sm font-semibold">
                                            {product.title}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {product.short_des}
                                        </p>
                                        <p className="text-xs">
                                            <strong>Color:</strong>{" "}
                                            {selectedColor || "Not Selected"}
                                        </p>
                                        <p className="text-xs">
                                            <strong>Size:</strong>{" "}
                                            {selectedSize || "Not Selected"}
                                        </p>
                                        <p className="text-xs">
                                            <strong>Quantity:</strong>{" "}
                                            {quantity}
                                        </p>
                                        <p className="text-sm font-semibold text-orange-600">
                                            ৳ {price}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm">
                                    <span>
                                        Items Total (<span>{quantity}</span>{" "}
                                        Item)
                                    </span>
                                    <span>৳ {price}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span>Quantity</span>
                                    <span> {quantity}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span>Delivery Fee</span>
                                    <span>৳ {shippingFee}</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>৳ {totalAmount}</span>
                                </div>
                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
                                    onClick={handlePayment}
                                >
                                    Proceed to Pay
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
