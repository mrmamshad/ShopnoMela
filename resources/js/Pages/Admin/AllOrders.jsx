import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { usePage } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import moment from "moment";

export default function AllOrders() {    
    const { orders } = usePage().props;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">All Orders</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="w-full text-sm">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-12">#</TableHead>
                                <TableHead className="min-w-32">Customer</TableHead>
                                <TableHead className="min-w-28">Phone</TableHead>
                                <TableHead className="min-w-40">Product</TableHead>
                                <TableHead className="w-16">Color</TableHead>
                                <TableHead className="w-16">Size</TableHead>
                                <TableHead className="w-16">Qty</TableHead>
                                <TableHead className="min-w-32">Merchant</TableHead>
                                <TableHead className="w-24">Amount</TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead className="min-w-32">Order Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={order.id} className="border-b">
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>{order.product?.title || "N/A"}</TableCell>
                                    <TableCell className="text-center">{order.product_color || "-"}</TableCell>
                                    <TableCell className="text-center">{order.product_size || "-"}</TableCell>
                                    <TableCell className="text-center">{order.product_quantity || "-"}</TableCell>
                                    <TableCell>{order.product?.merchant?.name || "N/A"}</TableCell>
                                    <TableCell className="font-semibold text-green-600">৳ {order.amount}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-white text-xs 
                                            ${order.status === 'pending' ? 'bg-yellow-500' :
                                               order.status === 'completed' ? 'bg-green-500' : 
                                               'bg-red-500'}`}>
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{moment(order.created_at).format("MMM DD, YYYY hh:mm A")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
