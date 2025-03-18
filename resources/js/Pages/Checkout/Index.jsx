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
    console.log("Product details:", product);
    // console.log("Shipping details:", shippingDetails);
    // console.log("Shipping fee:", shippingFee);
    // console.log("Total amount:", totalAmount);
    // console.log("Quantity:", quantity);
    // console.log("Price:", price);
    // console.log("Selected color:", selectedColor);
    // console.log("Selected size:", selectedSize);

    const [openDrawer, setOpenDrawer] = useState(false);
    // console.log("Shipping details:", shippingDetails);

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

    const form = useForm({
        product_id: "",
        amount: "",
        cus_name: "",
        cus_phone: "",
        ship_name: "",
        ship_add: "",
        ship_city: "",
        ship_state: "",
        product_name: "",
        quantity: "",
        color: "",
        size: "",
    });

const handlePayment = () => {
    const paymentData = {
        product_id: product.id,
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
    };

    // Store data in sessionStorage
    sessionStorage.setItem("payment_data", JSON.stringify(paymentData));

    // Redirect to Blade payment page
    window.location.replace(route("payment"));
};


    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Section - Shipping Details */}
                    <div className="md:col-span-2">

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
                                                             <Button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                                   
                                >
                                    Cash on Delivery
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
