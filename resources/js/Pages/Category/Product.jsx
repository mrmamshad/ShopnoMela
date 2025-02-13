import { useState } from "react";
import {
    Star,
    Heart,
    Share2,
    Minus,
    Plus,
    MapPin,
    Truck,
    ShieldCheck,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Link } from "@inertiajs/react";



const ProductDetails = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Mock data - replace with actual API data
    const product = {
        title: "Digital Home Tex Cotton Fabric Multicolor King Size Bedsheet With Two Matching Pillow Covers",
        price: 1450,
        images: [
            "https://img.drz.lazcdn.com/static/bd/p/b1ac851e7bb0fc6dc1cf419508f58477.jpg_200x200q90.jpg_.webp",
            "https://img.drz.lazcdn.com/static/bd/p/b1ac851e7bb0fc6dc1cf419508f58477.jpg_200x200q90.jpg_.webp",
            "https://img.drz.lazcdn.com/static/bd/p/b1ac851e7bb0fc6dc1cf419508f58477.jpg_200x200q90.jpg_.webp",
        ],
        brand: "No Brand",
        rating: 0,
        reviews: [
            { id: 1, user: "John D.", rating: 5, comment: "Great quality bedsheet, very comfortable!" },
            { id: 2, user: "Sarah M.", rating: 4, comment: "Nice design, but slightly thinner than expected." },
          ],
        seller: "Allshopbd",
        sellerRating: "100%",
    };

    const relatedProducts = [
        {
            id: 1,
            name: "Similar Bedsheet",
            price: 1299,
            image: "https://img.drz.lazcdn.com/static/bd/p/b1ac851e7bb0fc6dc1cf419508f58477.jpg_200x200q90.jpg_.webp",
            rating: 4.5,
        },
        // Add more related products
    ];

    const handleQuantityChange = (action) => {
        if (action === "increase") {
            setQuantity((prev) => prev + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const nextImage = () => {
        setCurrentImage((current) =>
            current === product.images.length - 1 ? 0 : current + 1
        );
    };
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))
      }

    const prevImage = () => {
        setCurrentImage((current) =>
            current === 0 ? product.images.length - 1 : current - 1
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {/* Breadcrumb */}

            <Breadcrumb className=" my-4  px-10 ">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">
                            Components
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={
                                    product.images[currentImage] ||
                                    "/placeholder.svg"
                                }
                                alt={product.title}
                                className="w-full aspect-square object-cover rounded-lg"
                            />
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex space-x-2 overflow-x-auto">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`flex-shrink-0 ${
                                        currentImage === index
                                            ? "ring-2 ring-orange-500"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={img || "/placeholder.svg"}
                                        alt={`Product ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-medium">
                                {product.title}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.floor(product.rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    No Ratings
                                </span>
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center text-gray-500">
                                        <Share2 className="h-5 w-5 mr-1" />
                                        Share
                                    </button>
                                    <button className="flex items-center text-gray-500">
                                        <Heart className="h-5 w-5 mr-1" />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="text-3xl font-bold">
                                ৳ {product.price}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Bedding Size</h3>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 border rounded-md bg-orange-500 text-white">
                                    King
                                </button>
                                <button className="px-4 py-2 border rounded-md hover:border-orange-500">
                                    Queen
                                </button>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Quantity</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        handleQuantityChange("decrease")
                                    }
                                    className="p-2 border rounded-md"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange("increase")
                                    }
                                    className="p-2 border rounded-md"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="space-y-4 border rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span>Deliver to</span>
                                        <button className="text-blue-600 text-sm">
                                            Change
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Mymensingh Sadar, Mymensingh
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <Truck className="h-5 w-5 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        Standard Delivery
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        3-5 days
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <ShieldCheck className="h-5 w-5 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        Cash on Delivery Available
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <Link  href={route('checkout')}  className="flex-1 text-center bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600">
                                Buy Now
                            </Link >
                            <button className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-md hover:bg-orange-50">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-medium mb-6">
                        Customer Reviews
                    </h2>
                    <div className="space-y-6">
                        {product.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-lg shadow p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">
                                        {review.user}
                                    </span>
                                    <div className="flex">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16">
                    <h2 className="text-2xl font-medium mb-6">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {relatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow p-4"
                            >
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full aspect-square object-cover rounded-md mb-4"
                                />
                                <h3 className="font-medium text-sm mb-2">
                                    {product.name}
                                </h3>
                                <div className="text-orange-500 font-bold">
                                    ৳ {product.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetails;
