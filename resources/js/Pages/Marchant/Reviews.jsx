import MarchantDashboardLayout from "@/Layouts/marchant-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { imageSrc } from "@/lib/utils";

export default function Reviews({ reviews }) {
    return (
        <MarchantDashboardLayout>
            <div className="mx-auto max-w-5xl px-4 sm:px-0 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Reviews</h1>
                {reviews.length === 0 ? (
                    <Card><CardContent className="p-6 text-center text-gray-400">No reviews yet.</CardContent></Card>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(r => (
                            <Card key={r.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{r.user?.name}</p>
                                            <div className="flex gap-0.5 my-1">
                                                {[1,2,3,4,5].map(i => (
                                                    <Star key={i} className={`w-4 h-4 ${i <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">{r.description}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 text-right max-w-[180px]">
                                            {r.product?.title}
                                            {r.image && <img src={imageSrc(r.image)} alt="review" className="mt-2 w-16 h-16 object-cover rounded" />}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MarchantDashboardLayout>
    );
}