import { useState } from "react";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";

const CartPage = ({ cartItems }) => {
    //   console.log("cartItems from backend:", cartItems);
    const { toast } = useToast();

    // Convert received cart items to local state
    const [cart, setCart] = useState(cartItems);

    const updateQuantity = (id, action) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          qty:
                              action === "increase"
                                  ? parseInt(item.qty) + 1
                                  : Math.max(1, parseInt(item.qty) - 1),
                      }
                    : item
            )
        );
    };

    const wishlistForm = useForm({
        product_id: null, // ✅ Keep it null initially
    });

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const { post, processing } = useForm();

    //   const addToWishlist = (productId) => {
    //     if (!productId) {
    //         console.error("Product ID is missing!");
    //         return;
    //     }

    //     {console.log("Product ID:", productId)}

    //     post(route("wishlist.store"), {
    //         data: { product_id: productId },  // ✅ Directly send product_id
    //         onSuccess: () => {
    //             toast({
    //                 title: "Added to Wishlist",
    //                 description: "Product added successfully!",
    //             });
    //         },
    //         onError: (errors) => {
    //             console.error("Error adding to wishlist:", errors);
    //         }
    //     });
    // };

    // Submit Wishlist
    const addToWishlist = (e, productId) => {
        e.preventDefault();  // ✅ Prevent default event behavior
    
        wishlistForm.setData("product_id", productId); // ✅ Correctly set product ID
    
        wishlistForm.post(route("wishlist.store"), {
            onSuccess: () => {
                toast({
                    title: "Added to Wishlist",
                    description: "The product was added successfully!",
                });
            },
            onError: (errors) => {
                console.error("Error adding to wishlist:", errors);
            }
        });
    };
    

    const subtotal = cart.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.qty),
        0
    );
    const discount = subtotal * 0.15;
    const tax = 0;
    const shipping = "Free";
    const total = subtotal - discount + tax;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-6">Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md"
                                >
                                    <div className="flex gap-6">
                                        <img
                                            src={
                                                item.product.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={item.product.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium text-lg">
                                                        {item.product.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">
                                                        {item.product.short_des}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>

                                                    {/* {console.log(item)} */}
                                                    <button
                                                        onClick={(e) =>
                                                            addToWishlist(
                                                                e,
                                                                item.product.id
                                                            )
                                                        } // ✅ Ensure e is first
                                                        className="flex items-center text-gray-500"
                                                        disabled={
                                                            wishlistForm.processing
                                                        }
                                                    >
                                                        <Heart className="h-5 w-5 mr-1" />
                                                        {processing
                                                            ? "Saving..."
                                                            : "Save"}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <span>Size: {item.size}</span>
                                                <span className="mx-2">•</span>
                                                <span>Color: {item.color}</span>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                "decrease"
                                                            )
                                                        }
                                                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                "increase"
                                                            )
                                                        }
                                                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">
                                                        $
                                                        {parseFloat(
                                                            item.price
                                                        ).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1 border rounded-lg shadow-sm">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Sub Total
                                    </span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Discount
                                    </span>
                                    <span className="text-green-600">
                                        ${discount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="text-orange-500">
                                        {shipping}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-black text-white rounded-lg py-3 mt-6 hover:bg-gray-800">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
