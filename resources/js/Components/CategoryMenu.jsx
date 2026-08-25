import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import CategoryImage from "@/Components/CategoryImage";

const CategoryMenu = ({ category }) => {
    const categories = category || [];

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
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
                            <CategoryImage
                                src={category.categoryImg}
                                alt={category.categoryName}
                                className="h-36 w-full rounded-lg"
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
