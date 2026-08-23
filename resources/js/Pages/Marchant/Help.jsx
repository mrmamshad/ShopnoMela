import MarchantDashboardLayout from "@/Layouts/marchant-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Help() {
    return (
        <MarchantDashboardLayout>
            <div className="mx-auto max-w-3xl px-4 sm:px-0 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Help & Support</h1>
                <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Contact Us</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-green-600" />
                                <a href="tel:01838891448" className="hover:text-green-600">01838891448</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                                <span>মুক্তিনগর, সানারপাড়, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>How to add a product</CardTitle></CardHeader>
                        <CardContent className="text-sm text-gray-600 space-y-2">
                            <p>1. Go to <strong>Products → Add Product</strong> in the sidebar.</p>
                            <p>2. Fill in the product details, upload images (ratio 1:1, max 1MB).</p>
                            <p>3. Select a category and brand, then click <strong>Create Product</strong>.</p>
                            <p>4. You can create your own brand from the <strong>Brands</strong> page.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>How to manage orders</CardTitle></CardHeader>
                        <CardContent className="text-sm text-gray-600 space-y-2">
                            <p>1. Go to <strong>Orders</strong> in the sidebar to see your orders.</p>
                            <p>2. Use the <strong>⋮</strong> menu on each order to confirm, ship, or mark as delivered.</p>
                            <p>3. Download order proof PDFs for your records.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MarchantDashboardLayout>
    );
}