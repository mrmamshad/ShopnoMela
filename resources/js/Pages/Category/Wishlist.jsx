import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Trash2, Store } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

const WishlistPage = ({ wishlistItems }) => {
    const { toast } = useToast();
    const { delete: destroy, processing } = useForm();
    const checkoutForm = useForm();

    const removeFromWishlist = (id) => {
        destroy(route("wishlist.destroy", id), {
            onSuccess: (page) => {
                toast({
                    title: "Success",
                    description: page.props.flash?.message || "Wishlist item removed successfully!",
                });
            },
            onError: (errors) => {
                console.error("Error removing from wishlist:", errors);
            },
        });
    };

    const checkoutProduct = (productId) => {
        checkoutForm.post(route("checkout.store", { productId }), {
            onSuccess: () => {
                toast({
                    title: "Checkout Successful",
                    description: "Proceed to payment to complete your order.",
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">My Wishlist</h1>
                </div>

                {/* Wishlist Items */}
                <div className="space-y-6">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
                            >
                                {/* Store Header */}
                                <div className="border-b p-5 flex items-center bg-gray-50">
                                    <Store className="w-6 h-6 mr-3 text-gray-600" />
                                    <span className="font-semibold text-gray-800">
                                        Merchant Store
                                    </span>
                                </div>

                                {/* Product Card */}
                                <div className="divide-y divide-gray-200">
                                    <div className="p-6 hover:bg-gray-50 transition">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Product Image */}
                                            <img
                                                src={item.product.image || "/placeholder.svg"}
                                                alt={item.product.title}
                                                className="w-full md:w-48 h-48 object-cover rounded-xl border"
                                            />

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {item.product.short_des}
                                                        </p>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition"
                                                        title="Remove from wishlist"
                                                        disabled={processing}
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Price & Checkout */}
                                                <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div>
                                                        <div className="text-2xl font-bold text-gray-900">
                                                            ৳ {item.product.price}
                                                        </div>
                                                        {item.product.discount > 0 && (
                                                            <div className="text-sm mt-1">
                                                                <span className="text-gray-500 line-through">
                                                                    ৳ {(item.product.price + (item.product.discount / 100) * item.product.price).toFixed(2)}
                                                                </span>
                                                                <span className="text-orange-500 ml-2 font-medium">
                                                                    -{item.product.discount}%
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Checkout Button */}
                                                    <button
                                                        onClick={() => checkoutProduct(item.product.id)}
                                                        className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center shadow-md transition"
                                                        disabled={checkoutForm.processing}
                                                    >
                                                        {checkoutForm.processing ? "Processing..." : "Checkout"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Empty State
                        <div className="text-center py-12">
                            <h2 className="text-xl font-medium text-gray-900 mb-2">
                                Your wishlist is empty
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Save items that you like in your wishlist and buy them later.
                            </p>
                            <Link href="/" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WishlistPage;
