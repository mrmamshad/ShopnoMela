import AdminLayout from "@/Layouts/admin-dashboard-layout";
import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

export default function MerchantOrdersUpdate() {
    const { orders, stores } = usePage().props;
    console.log(orders);

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-4">
                <h1 className="text-2xl font-semibold text-gray-800">📢 Merchant Order Updates</h1>

                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const store = stores.find(store => store.user_id === order.product.user_id);
                            return (
                                <div key={order.id} className="flex items-start space-x-4 p-4 rounded-lg shadow-sm">
                                    {/* Profile Image Placeholder */}
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                                        {order.product.user.name[0]}
                                    </div>

                                    <Card className="flex-1 p-3 space-y-2 shadow-md  ">
                                        <CardContent className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-md font-semibold">
                                                    📦 {order.product?.title}
                                                </h2>
                                                <span className={`px-2 py-1 text-xs font-bold rounded ${
                                                    order.status === "Shipped" ? "bg-green-200 text-green-800" : 
                                                    "bg-yellow-200 text-yellow-800"
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600">
                                                Order from <strong>{order.product.user.name}</strong>
                                            </p>
                                            
                                            <p className="text-sm text-gray-600">
                                                <strong>Order ID:</strong> #{order.id}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Product Name:</strong> {order.product.title}
                                            </p>
                                             <p className="text-sm text-gray-600">
                                                <strong>Product Color:</strong> {order.product_color}
                                            </p>
                                             <p className="text-sm text-gray-600">
                                                <strong>Product Size:</strong> {order.product_size}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                <strong>Merchant Contact:</strong> {store?.contact_phone || "N/A"}
                                            </p>

                                            <div className="text-sm text-gray-500">
                                                <span>📦 Quantity: {order.product_quantity} | {order.amount}💰 Tk</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No recent merchant orders.</p>
                )}
            </div>
        </AdminLayout>
    );
}
