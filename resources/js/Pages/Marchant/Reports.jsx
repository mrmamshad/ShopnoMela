import MarchantDashboardLayout from "@/Layouts/marchant-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function Reports({ productCount, orderCount, revenue, byStatus, topProducts }) {
    return (
        <MarchantDashboardLayout>
            <div className="mx-auto max-w-5xl px-4 sm:px-0 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card><CardContent className="p-4"><CardTitle className="text-lg">{productCount}</CardTitle><p className="text-sm text-gray-500">Products</p></CardContent></Card>
                    <Card><CardContent className="p-4"><CardTitle className="text-lg">{orderCount}</CardTitle><p className="text-sm text-gray-500">Total Orders</p></CardContent></Card>
                    <Card><CardContent className="p-4"><CardTitle className="text-lg">{formatCurrency(revenue)}</CardTitle><p className="text-sm text-gray-500">Total Revenue</p></CardContent></Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Orders by Status</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {Object.keys(byStatus || {}).map(status => (
                                    <div key={status} className="flex justify-between border-b pb-2 text-sm">
                                        <Badge variant="secondary">{status}</Badge>
                                        <span>{byStatus[status]}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Top Selling Products</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {topProducts.map((p, i) => (
                                    <div key={i} className="flex justify-between border-b pb-2 text-sm">
                                        <span>{p.title}</span>
                                        <span className="text-gray-500">{p.count} orders · {formatCurrency(p.revenue)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MarchantDashboardLayout>
    );
}