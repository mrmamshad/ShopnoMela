import { Head } from "@inertiajs/react";
import { Suspense, lazy, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

// Below-the-fold sections are loaded lazily so the home page
// paints the hero area first and only fetches the rest on demand.
const OfferSlider = lazy(() => import("@/Components/OfferSlider"));
const FlashSale = lazy(() => import("@/Components/FlashSale"));
const CategoryMenu = lazy(() => import("@/Components/CategoryMenu"));
const LatestProducts = lazy(() => import("@/Components/LatestProducts"));
const FeaturedProducts = lazy(() => import("@/Components/FeaturedProducts"));

function SectionLoader() {
    return (
        <div className="w-full animate-pulse rounded-xl bg-gray-200 h-64 mt-2" />
    );
}

export default function Welcome({
    user,
    category,
    offers,
    flashSales,
    randomProducts,
    latestProducts,
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
                <title>Tajim Foods Products</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Tajim Foods Products - মুক্তিনগর, সানারপাড়, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ। যোগাযোগ: 01838891448"
                />
                <link rel="preconnect" href="https://picsum.photos" />
                <link rel="preconnect" href="https://img.lazcdn.com" />
            </Head>
            <Header user={user} />
            <main className="container mx-auto px-4 py-6">
                <div className="w-full mt-2">
                    <OfferSlider offers={offers} />
                </div>

                <Suspense fallback={<SectionLoader />}>
                    <FlashSale flashSales={flashSales} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <CategoryMenu category={category} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <LatestProducts latestProducts={latestProducts} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <FeaturedProducts randomProducts={randomProducts} />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
