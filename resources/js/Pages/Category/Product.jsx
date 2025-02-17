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
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Bold,
    Code,
    ImageIcon,
    Link,
    List,
    MessageSquare,
    MoreHorizontal,
    ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ShoppingCart, Eye } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { StarHalf } from "lucide-react";

const ProductDetails = ({
    productdetails,
    singleproduct,
    relatedproducts,
    reviews,
}) => {
    // console.log("Related products:", relatedproducts);
    // console.log("Product details:", productdetails);
    // console.log("Single product:", singleproduct);
    console.log("Reviews:", reviews);

    const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const [comments, setComments] = useState([
        {
            id: 1,
            user: {
                name: "Michael Gough",
                avatar: "/placeholder.svg",
                initials: "MG",
            },
            content:
                "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
            likes: 11,
            timestamp: "Nov 18 '22",
            replies: 2,
        },
        {
            id: 2,
            user: {
                name: "Bonnie Green",
                avatar: "/placeholder.svg",
                initials: "BG",
            },
            content:
                "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
            likes: 24,
            timestamp: "Nov 15 '22",
            replies: 0,
        },
    ]);

    // Extract images into an array
    const productImages = [
        productdetails.img1,
        productdetails.img2,
        productdetails.img3,
        productdetails.img4,
    ].filter(Boolean); // Remove any undefined/null values

    const nextImage = () => {
        setCurrentImage((current) =>
            current === productImages.length - 1 ? 0 : current + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((current) =>
            current === 0 ? productImages.length - 1 : current - 1
        );
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                }`}
            />
        ));
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
        // Here you would typically send this data to your backend or update a global state
        console.log(`Added ${product.name} to cart`);
    };

    const { data, setData, post, processing, reset } = useForm({
        description: "",
        rating: 0,
        image: null,
        product_id: productdetails.id,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRating = (ratingValue) => {
        setData("rating", ratingValue);
    };

    const submitReview = (e) => {
        e.preventDefault();
        post(route("reviews.store"), {
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <Breadcrumb className="my-4 px-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{singleproduct.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={
                                    productImages[currentImage] ||
                                    "/placeholder.svg"
                                }
                                alt={singleproduct.title}
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
                            {productImages.map((img, index) => (
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
                                        src={img}
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
                                {singleproduct.title}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    {renderStars(singleproduct.star)}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {singleproduct.star} / 5
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
                                ৳ {singleproduct.price}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Size</h3>
                            <Button>{productdetails.size}</Button>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Quantity</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="p-2 border rounded-md"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 border rounded-md"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="space-y-4 border rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <Truck className="h-5 w-5 text-gray-500" />
                                <div>
                                    <div className="font-medium">
                                        Standard Delivery
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Delivery in Max :{" "}
                                        <span className="text-green-500">
                                            4 Hours
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="flex-1 text-center bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600">
                                Buy Now
                            </button>
                            <button className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-md hover:bg-orange-50">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Product Reviews */}
            <div className="w-full max-w-5xl mx-auto px-4 p-2 sm:p-4">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">
                        Reviews ({reviews.length})
                    </h2>
                    <Button variant="outline" className="hidden sm:flex">
                        Subscribe
                    </Button>
                    <Button variant="outline" size="sm" className="sm:hidden">
                        Sub
                    </Button>
                </div>

                {/* Comment Input */}
                <Card className="mb-4 sm:mb-6">
                    <CardContent className="p-3 sm:p-4">
                        <form
                            onSubmit={submitReview}
                            className="flex gap-2 sm:gap-4"
                        >
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                {/* Rating System */}
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            onClick={() => handleRating(star)}
                                            className={`w-6 h-6 cursor-pointer ${
                                                data.rating >= star
                                                    ? "text-yellow-500"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Review Textarea */}
                                <Textarea
                                    placeholder="Write your review..."
                                    className="min-h-[80px] sm:min-h-[100px] mb-2"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                {/* Image Preview */}
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg mb-2"
                                    />
                                )}

                                <div className="flex items-center gap-3">
                                    {/* File Upload */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="review-image"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="review-image"
                                        className="cursor-pointer"
                                    >
                                        <ImageIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                    </label>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Submit Review"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-3 sm:space-y-4">
                    {reviews.map((comment) => (
                        <Card key={comment.id} className="relative">
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex gap-2 sm:gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start sm:items-center gap-2 mb-2">
                                            <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                                                <AvatarImage
                                                    src={
                                                        comment.image
                                                            .avatar ||
                                                        `/placeholder.svg`
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {comment.user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                                                <span className="font-semibold text-sm sm:text-base">
                                                    {
                                                        comment.user.name
                                                            
                                                    }
                                                </span>
                                                <span className="text-muted-foreground text-xs sm:text-sm">
                                                    {new Date(
                                                        comment.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Display Review Text */}
                                        <p className="text-sm mb-2">
                                            {comment.description}
                                        </p>

                                        {/* Display Uploaded Image (if exists) */}
                                        {comment.image && (
                                            <img
                                                src={comment.image}
                                                alt="Review"
                                                className="w-32 h-32 object-cover rounded-lg mb-2"
                                            />
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-muted-foreground"
                                            >
                                                <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                                <span className="text-sm">
                                                    Like
                                                </span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-muted-foreground"
                                            >
                                                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                                <span className="text-sm">
                                                    Reply
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Related Products */}
            <section className="w-full max-w-5xl mx-auto  py-8 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                    {relatedproducts.map((product) => (
                        <Card key={product.id} className="flex flex-col">
                            <CardHeader className="p-0">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-[200px] object-cover rounded-t-lg"
                                />
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="text-sm font-medium line-clamp-1">
                                    {product.name}
                                </CardTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                    ${product.price.toFixed(2)}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                                <Button
                                    onClick={() => addToCart(product)}
                                    className="w-full"
                                    size="sm"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={() => viewDetails(product.id)}
                                    variant="outline"
                                    className="w-full"
                                    size="sm"
                                >
                                    <Eye className="mr-2 h-4 w-4" /> View
                                    Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ProductDetails;
