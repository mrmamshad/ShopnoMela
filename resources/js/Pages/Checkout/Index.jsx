import { usePage, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { imageSrc, formatCurrency } from "@/lib/utils";

const Checkout = () => {
    const { toast } = useToast();
    const {
        cartItems,
        shippingFee,
        subtotal,
        totalAmount,
        shippingDetails,
    } = usePage().props;
    const { auth } = usePage().props;

    const [openDrawer, setOpenDrawer] = useState(false);

    const { data, setData, post, processing } = useForm({
        cus_name: shippingDetails?.name || auth?.user?.name || "",
        cus_phone:
            (shippingDetails?.phone && shippingDetails.phone !== "Not provided" ? shippingDetails.phone : "") ||
            auth?.user?.phone ||
            "",
        cus_email: auth?.user?.email || "",
        cus_password: "",
        ship_add: shippingDetails?.address || "",
    });

    const handleCODOrder = (e) => {
        e.preventDefault();
        post(route("order.cod"), {
            onSuccess: () => {
                setOpenDrawer(false);
                toast({
                    title: "Order Placed!",
                    description:
                        "Your Cash on Delivery order has been placed successfully.",
                    variant: "default",
                });
            },
        });
    };

    const handlePayment = () => {
        const paymentData = {
            cus_name: shippingDetails?.name || data.cus_name,
            cus_phone: shippingDetails?.phone || data.cus_phone,
            ship_add: shippingDetails?.address || data.ship_add,
            ship_city: shippingDetails?.city,
            ship_state: shippingDetails?.state,
            amount: totalAmount,
            items: cartItems,
        };

        sessionStorage.setItem("payment_data", JSON.stringify(paymentData));
        window.location.replace(route("payment"));
    };

    const items = cartItems || [];

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Section - Items */}
                    <div className="md:col-span-2">
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>
                                    Items ({items.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 border p-3 rounded-lg"
                                    >
                                        <img
                                            src={
                                                imageSrc(
                                                    item.product?.image
                                                )
                                            }
                                            alt={item.product?.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-sm font-semibold">
                                                {item.product?.title}
                                            </h2>
                                            <p className="text-xs text-gray-500">
                                                {item.product?.short_des}
                                            </p>
                                            <p className="text-xs">
                                                <strong>Color:</strong>{" "}
                                                {item.color || "Not Selected"}
                                            </p>
                                            <p className="text-xs">
                                                <strong>Size:</strong>{" "}
                                                {item.size || "Not Selected"}
                                            </p>
                                            <p className="text-xs">
                                                <strong>Quantity:</strong>{" "}
                                                {item.qty}
                                            </p>
                                            <p className="text-sm font-semibold text-orange-600">
                                                {formatCurrency(
                                                    item.price * item.qty
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
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
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span>Delivery Fee</span>
                                    <span>{formatCurrency(shippingFee)}</span>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
                                    onClick={handlePayment}
                                >
                                    Proceed to Pay
                                </Button>

                                {/* Cash on Delivery Button */}
                                <Drawer
                                    open={openDrawer}
                                    onOpenChange={setOpenDrawer}
                                >
                                    <DrawerTrigger asChild>
                                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">
                                            Cash on Delivery
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                Enter Shipping Details
                                            </DrawerTitle>
                                        </DrawerHeader>
                                        <form
                                            onSubmit={handleCODOrder}
                                            className="p-4"
                                        >
                                            <Label htmlFor="cus_name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="cus_name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={data.cus_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "cus_name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <Label
                                                htmlFor="cus_phone"
                                                className="mt-3"
                                            >
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="cus_phone"
                                                type="text"
                                                placeholder="Enter phone number"
                                                value={data.cus_phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "cus_phone",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <Label
                                                htmlFor="cus_email"
                                                className="mt-3"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="cus_email"
                                                type="email"
                                                placeholder="Enter email"
                                                value={data.cus_email}
                                                onChange={(e) =>
                                                    setData(
                                                        "cus_email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <Label
                                                htmlFor="cus_password"
                                                className="mt-3"
                                            >
                                                Password
                                                <span className="text-xs font-normal text-gray-400">
                                                    {" "}
                                                    (optional — for login to
                                                    your account)
                                                </span>
                                            </Label>
                                            <Input
                                                id="cus_password"
                                                type="password"
                                                placeholder="Set a password (optional)"
                                                value={data.cus_password}
                                                onChange={(e) =>
                                                    setData(
                                                        "cus_password",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <Label
                                                htmlFor="ship_add"
                                                className="mt-3"
                                            >
                                                Shipping Address
                                            </Label>
                                            <Input
                                                id="ship_add"
                                                type="text"
                                                placeholder="Enter shipping address"
                                                value={data.ship_add}
                                                onChange={(e) =>
                                                    setData(
                                                        "ship_add",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                                            >
                                                {processing
                                                    ? "Placing Order..."
                                                    : "Confirm Order"}
                                            </Button>
                                        </form>
                                    </DrawerContent>
                                </Drawer>
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
