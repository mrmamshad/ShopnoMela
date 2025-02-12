import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";


const categories = [
    {
        name: "Routers",
        image: "https://img.drz.lazcdn.com/static/bd/p/4fa56f8f292aa05e151e0fc9c69c81f1.jpg_170x170q80.jpg",
    },
    {
        name: "Makeup Removers",
        image: "https://img.drz.lazcdn.com/static/bd/p/2d5122ab5d55132bae0762eb4bac9b3c.jpg_170x170q80.jpg",
    },
    {
        name: "Watches and Accessories",
        image: "https://img.drz.lazcdn.com/static/bd/p/19aa51f157c11da7d843de3f78b23094.jpg_170x170q80.jpg",
    },
    {
        name: "Rain Coats & Trenches",
        image: "https://img.drz.lazcdn.com/static/bd/p/69a55ff275d5ab08807855d58b14e611.jpg_170x170q80.jpg",
    },
    {
        name: "Activities & Entertainment",
        image: "https://img.drz.lazcdn.com/static/bd/p/2d5122ab5d55132bae0762eb4bac9b3c.jpg_170x170q80.jpg",
    },
    {
        name: "Egg Boilers",
        image: "https://img.drz.lazcdn.com/static/bd/p/2d5122ab5d55132bae0762eb4bac9b3c.jpg_170x170q80.jpg",
    },
    {
        name: "Pillow Protectors",
        image: "https://img.drz.lazcdn.com/static/bd/p/2d5122ab5d55132bae0762eb4bac9b3c.jpg_170x170q80.jpg",
    },
    {
        name: "Plastic",
        image: "https://img.drz.lazcdn.com/g/kf/S2237e86ca573464c9b661ac7ec781c82T.jpg_170x170q80.jpg",
    },
    {
        name: "Beverages",
        image: "https://img.drz.lazcdn.com/static/bd/p/aab9a426a5442bb93d459efe5833d17f.jpg_170x170q80.jpg",
    },
    {
        name: "Beans & Chickpeas",
        image: "https://img.drz.lazcdn.com/static/bd/p/4fb3fa9d93ab3bee6c79c1613c76e7b9.jpg_170x170q80.jpg",
    },
    {
        name: "Kaya",
        image: "https://img.drz.lazcdn.com/static/bd/p/39ea53bca1c149b72e6a1909cca85326.jpg_170x170q80.jpg",
    },
    {
        name: "Washer & Dryer Accessories",
        image: "https://img.drz.lazcdn.com/static/bd/p/85cb226942e87828785fd5cecc4030ea.jpg_170x170q80.jpg",
    },
    {
        name: "Comfortars",
        image: "https://img.drz.lazcdn.com/static/bd/p/87beb6668315d34517bbe4c4cc1f48f2.jpg_170x170q80.jpg",
    },
    {
        name: "Board Games",
        image: "https://img.drz.lazcdn.com/static/bd/p/3a7031828e337e4e15dfc0e70f4d0c7d.jpg_170x170q80.jpg",
    },
    {
        name: "Lamp Shades",
        image: "https://img.drz.lazcdn.com/static/bd/p/61004464bed0e57fbabbda917c16acdb.jpg_170x170q80.jpg",
    },
    {
        name: "Bathroom Lighting",
        image: "https://img.drz.lazcdn.com/static/bd/p/c8730ce23baeed44762ae9d2b3df3adb.jpg_170x170q80.jpg   ",
    },
];



const Categories = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-md p-4 rounded-lg text-center cursor-pointer hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        
                    >
                       <Link href={route('category')}>
                       <img
                            src={category.image}
                            alt={category.name}
                            className="w-16 h-16 mx-auto mb-2"
                        />
                        <p className="text-gray-700 font-medium text-sm">
                            {category.name}
                        </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
