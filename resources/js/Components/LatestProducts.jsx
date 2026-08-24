import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatCurrency, imageSrc, imageFallback } from "@/lib/utils";

function LatestProducts({ latestProducts }) {
    const products = latestProducts || [];

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    🆕 Latest Products
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
                        className="h-full"
                    >
                        <Link
                            href={route("product.show", product.id)}
                            className="block h-full"
                        >
                            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-gray-100 cursor-pointer">
                                <div className="overflow-hidden">
                                    <img
                                        src={
                                            imageSrc(product.image) ||
                                            "/placeholder.jpg"
                                        }
                                        alt={product.title}
                                        loading="lazy"
                                        decoding="async"
                                        onError={imageFallback}
                                    className="w-full h-32 sm:h-44 lg:h-48 object-contain bg-white hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardHeader className="pb-1">
                                <CardTitle className="text-sm md:text-base font-semibold line-clamp-2">
                                    {product.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4 flex-1">
                                <p className="text-base md:text-lg font-bold text-green-600">
                                        {formatCurrency(product.price)}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default LatestProducts;
