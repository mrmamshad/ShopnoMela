import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

const Categories = ({ category }) => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.map((category, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-md p-4 rounded-lg text-center cursor-pointer hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link href={route("category")}>
                            <img
                                src={`${category.categoryImg}`}
                                alt={category.name}
                                className="w-full h-40 object-cover rounded-md"
                            />

                            <p className="text-gray-700 font-semibold mt-1 text-md">
                                {category.categoryName}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
