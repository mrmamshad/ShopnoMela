import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, imageSrc } from "@/lib/utils";

export default function MerchantDetails({ merchant, store, products, orders, productCount, orderCount, totalSales }) {
    return (
        <DashboardLayout>
            <div className="mb-6">
                <Link href={route("marchantlist")} className="text-sm text-blue-600 hover:underline">&larr; Back to Merchants</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{merchant.name}</CardTitle><p className="text-sm text-gray-500">{merchant.email}</p>{merchant.phone && <p className="text-sm text-gray-500">{merchant.phone}</p>}</CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{productCount}</CardTitle><p className="text-sm text-gray-500">Products</p></CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{orderCount}</CardTitle><p className="text-sm text-gray-500">Orders</p></CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{formatCurrency(totalSales)}</CardTitle><p className="text-sm text-gray-500">Total Sales</p></CardContent></Card>
            </div>
            {store && (
                <Card className="mb-6">
                    <CardHeader><CardTitle>Store</CardTitle></CardHeader>
                    <CardContent>
                        <p><strong>Name:</strong> {store.name}</p>
                        <p><strong>Email:</strong> {store.contact_email}</p>
                        <p><strong>Phone:</strong> {store.contact_phone}</p>
                        <p><strong>Description:</strong> {store.description}</p>
                    </CardContent>
                </Card>
            )}
            <Card className="mb-6">
                <CardHeader><CardTitle>Products ({productCount})</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {products.map(p => (
                            <Card key={p.id} className="p-3">
                                <img src={imageSrc(p.image) || ""} alt={p.title} className="h-24 w-full object-cover rounded mb-2" />
                                <p className="text-sm font-medium truncate">{p.title}</p>
                                <p className="text-xs text-gray-500">{formatCurrency(p.price)}</p>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Orders ({orderCount})</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {orders.map(o => (
                            <div key={o.id} className="flex justify-between border-b pb-2 text-sm">
                                <span>{o.product?.title} x {o.product_quantity}</span>
                                <span><Badge variant={o.status === 'Delivered' ? 'default' : 'secondary'}>{o.status}</Badge></span>
                                <span>{formatCurrency(o.amount)}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}