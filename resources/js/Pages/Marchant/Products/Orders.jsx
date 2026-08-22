import DashboardLayout from "@/Layouts/marchant-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import {
    CheckCheck,
    Trash2,
    MoreHorizontal,
    Truck,
    PackageCheck,
    FileDown,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderProofPDF from "@/Components/OrderProofPDF";
import { formatCurrency } from "@/lib/utils";
const audioSrc = "/audio/notification.wav";

export default function MarchantOrders({ orders }) {
    const [prevOrderCount, setPrevOrderCount] = useState(orders.length);
    const { post, delete: destroy } = useForm();

    useEffect(() => {
        if (orders.length > prevOrderCount) {
            playNotificationSound();
            setPrevOrderCount(orders.length);
        }
    }, [orders.length]);

    const playNotificationSound = () => {
        const audio = new Audio(audioSrc);
        audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));
    };

    const handleShipOrder = (orderId) => {
        post(route("merchant.orders.ship", { id: orderId }));
    };

    const handleConfirm = (orderId) => {
        post(route("merchant.orders.confirm", { id: orderId }));
    };

    const handleDeliver = (orderId) => {
        post(route("merchant.orders.delivered", { id: orderId }));
    };

    const handleDelete = (orderId) => {
        if (confirm("Are you sure you want to delete this order?")) {
            destroy(route("merchant.orders.delete", { id: orderId }));
        }
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
                                <TableHead className="text-right">Action</TableHead>
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
                                        <TableCell>
                                            {formatCurrency(order.amount)}
                                        </TableCell>
                                        <TableCell>
                                            {order.payment_method}
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                order.created_at
                                            ).format("YYYY-MM-DD")}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                    order.status ===
                                                    "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.status ===
                                                          "Shipped"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : order.status ===
                                                          "confirmed"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        aria-label="Order actions"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-64"
                                                >
                                                    <DropdownMenuLabel>
                                                        Order Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleConfirm(
                                                                order.id
                                                            )
                                                        }
                                                        disabled={
                                                            order.status ===
                                                                "confirmed" ||
                                                            order.status ===
                                                                "Shipped" ||
                                                            order.status ===
                                                                "Delivered"
                                                        }
                                                    >
                                                        <CheckCheck className="h-4 w-4 text-green-600" />
                                                        Confirm Order
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleShipOrder(
                                                                order.id
                                                            )
                                                        }
                                                        disabled={
                                                            order.status ===
                                                                "Shipped" ||
                                                            order.status ===
                                                                "Delivered"
                                                        }
                                                    >
                                                        <Truck className="h-4 w-4 text-blue-600" />
                                                        {order.status ===
                                                        "Shipped"
                                                            ? "Shipped"
                                                            : "Send for Shipping"}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeliver(
                                                                order.id
                                                            )
                                                        }
                                                        disabled={
                                                            order.status ===
                                                            "Delivered"
                                                        }
                                                    >
                                                        <PackageCheck className="h-4 w-4 text-emerald-600" />
                                                        {order.status ===
                                                        "Delivered"
                                                            ? "Delivered"
                                                            : "Mark as Delivered"}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <PDFDownloadLink
                                                            document={
                                                                <OrderProofPDF
                                                                    order={
                                                                        order
                                                                    }
                                                                />
                                                            }
                                                            fileName={`Order_Proof_${order.id}.pdf`}
                                                        >
                                                            {({ loading }) => (
                                                                <>
                                                                    <FileDown className="h-4 w-4 text-gray-600" />
                                                                    {loading
                                                                        ? "Generating..."
                                                                        : "Download Order Proof"}
                                                                </>
                                                            )}
                                                        </PDFDownloadLink>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDelete(
                                                                order.id
                                                            )
                                                        }
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete Order
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan="9"
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
