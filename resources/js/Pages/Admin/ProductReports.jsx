import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, imageSrc } from "@/lib/utils";

export default function ProductReports({ products, totalProducts, merchantCounts, totalRevenue, totalOrders }) {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Product Reports</h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{totalProducts}</CardTitle><p className="text-sm text-gray-500">Total Products</p></CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{totalOrders}</CardTitle><p className="text-sm text-gray-500">Total Orders</p></CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{formatCurrency(totalRevenue)}</CardTitle><p className="text-sm text-gray-500">Total Revenue</p></CardContent></Card>
                <Card><CardContent className="p-4"><CardTitle className="text-lg">{Object.keys(merchantCounts || {}).length}</CardTitle><p className="text-sm text-gray-500">Active Merchants</p></CardContent></Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Products by Sales</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b text-gray-500">
                                <th className="py-2">Product</th>
                                <th className="py-2">Merchant</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Orders</th>
                                <th className="py-2">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b">
                                    <td className="py-2 flex items-center gap-2">
                                        <img src={imageSrc(p.image) || ""} alt={p.title} className="w-10 h-10 object-cover rounded" />
                                        <span className="truncate max-w-[200px]">{p.title}</span>
                                    </td>
                                    <td className="py-2">{p.user?.name}</td>
                                    <td className="py-2">{formatCurrency(p.price)}</td>
                                    <td className="py-2">{p.order_count}</td>
                                    <td className="py-2 font-medium">{formatCurrency(p.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}