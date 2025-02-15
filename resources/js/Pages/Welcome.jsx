import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import CategoryMenu from "@/Components/CategoryMenu";
import FeaturedProducts from "@/Components/FeaturedProducts";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import OfferSlider from "@/Components/OfferSlider";
import FlashSale from "@/Components/FlashSale";

export default function Welcome({ user, category }) {
    // console.log(category);
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Home</title>
            </Head>
            <Header  user={user} />
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <OfferSlider />
                    <FlashSale />
                    <CategoryMenu  category={category}   />
                    <FeaturedProducts />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
