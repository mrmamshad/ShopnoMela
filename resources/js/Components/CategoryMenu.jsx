import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { imageSrc, imageFallback } from "@/lib/utils";

const CategoryMenu = ({ category }) => {
    const categories = category || [];

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Categories
                </h2>
                <Link
                    href={route("category")}
                    className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        className="bg-white shadow-sm border border-gray-100 p-3 rounded-xl text-center cursor-pointer hover:shadow-lg transition-all"
                        whileHover={{ y: -4 }}
                    >
                        <Link
                            href={route("category.products", {
                                id: category.id,
                            })}
                        >
                            <img
                                src={imageSrc(category.categoryImg)}
                                alt={category.categoryName}
                                loading="lazy"
                                decoding="async"
                                onError={imageFallback}
                                className="w-full h-36 object-cover rounded-lg"
                            />
                            <p className="text-gray-700 font-semibold mt-2 text-sm line-clamp-1">
                                {category.categoryName}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;
