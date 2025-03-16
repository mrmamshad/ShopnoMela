import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import CategoryMenu from "@/Components/CategoryMenu";
import FeaturedProducts from "@/Components/FeaturedProducts";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import OfferSlider from "@/Components/OfferSlider";
import FlashSale from "@/Components/FlashSale";
import ActionSearchBar from "@/Components/ActionSearchBar";
import { usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Welcome({
    user,
    category,
    offers,
    flashSales,
    randomProducts,
}) {
    const { flash } = usePage().props;
    const { toast } = useToast();
    useEffect(() => {
        if (flash.notification) {
            toast({
                title: "Notification",
                description: flash.notification,
                variant: "default",
            });
        }
    }, [flash.notification, toast]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Home</title>
            </Head>
            <Header user={user} />
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ActionSearchBar />
                    <div className="w-full mt-2">
                        <OfferSlider offers={offers} />
                    </div>
                    <div className="w-full">
                        <FlashSale flashSales={flashSales} />
                    </div>

                    <CategoryMenu category={category} />
                    <FeaturedProducts randomProducts={randomProducts} />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
