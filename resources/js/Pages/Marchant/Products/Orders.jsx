import DashboardLayout from "@/Layouts/marchant-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Check, CheckCheck, Trash2, X } from "lucide-react";
import moment from "moment";
const audioSrc = "/audio/notification.wav";

export default function MarchantOrders({ orders }) {
    const [prevOrderCount, setPrevOrderCount] = useState(orders.length);
    console.log("orderslength", orders.length);
    const { post, delete: destroy } = useForm();
    useEffect(() => {
        // play notification sound when new order is added
        if (orders.length > prevOrderCount) {
            playNotificationSound();
            setPrevOrderCount(orders.length);
        }
        // const audio = new Audio(audioSrc);
        // audio.play().catch((error) => console.error("Audio play failed:", error));
    }, [orders.length]);

    const playNotificationSound = () => {
        const audio = new Audio(audioSrc);
        audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));
    };
    const playsound = () => {
        const audio = new Audio(audioSrc);
        audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));
    };

    const handleShipOrder = (orderId) => {
        post(route("merchant.orders.ship", { id: orderId }));
    };

    // Handle Order Confirmation
    const handleConfirm = (orderId) => {
        post(route("merchant.orders.confirm", { id: orderId }));
    };

    // Handle Order Deletion
    const handleDelete = (orderId) => {
        destroy(route("merchant.orders.delete", { id: orderId }));
    };

    return (
        <DashboardLayout>
            <Card className="mx-auto max-w-6xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Merchant Orders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Order Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            {order.product?.id}
                                        </TableCell>
                                        <TableCell>
                                            {order.user?.name}
                                        </TableCell>
                                        <TableCell>
                                            {order.product?.title}
                                        </TableCell>
                                        <TableCell>
                                            {order.product_quantity}
                                        </TableCell>
                                        <TableCell>${order.amount}</TableCell>
                                        <TableCell>
                                            {order.payment_method}
                                        </TableCell>
                                        <TableCell>
                                            {moment(order.created_at).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell className="flex gap-2">
                                            {/* Confirm Order Button */}
                                            <Button
                                                size="sm"
                                                variant="success"
                                                className="bg-green-500 hover:bg-green-600"
                                                onClick={() =>
                                                    handleConfirm(order.id)
                                                }
                                            >
                                                <CheckCheck size={16} />
                                            </Button>

                                            {/* Delete Order Button */}
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(order.id)
                                                }
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                            {/* send for shipping */}
                                            <Button
                                                size="sm"
                                                variant={
                                                    order.status === "Shipped"
                                                        ? "success"
                                                        : "outline"
                                                }
                                                disabled={
                                                    order.status === "Shipped"
                                                }
                                                onClick={() =>
                                                    handleShipOrder(order.id)
                                                }
                                            >
                                                {order.status === "Shipped"
                                                    ? "Shipped"
                                                    : "Send for Shipping"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={
                                                    order.status === "Delivered"
                                                        ? "success"
                                                        : "outline"
                                                }
                                                disabled={
                                                    order.status === "Delivered"
                                                }
                                                onClick={() => playsound()}
                                            >
                                                {order.status === "Delivered"
                                                    ? "Delivered"
                                                    : "Mark as Delivered"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan="7"
                                        className="text-center"
                                    >
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
