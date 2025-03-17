import { useState, useEffect } from "react";
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
import { useForm, usePage, Link } from "@inertiajs/react";
import { StarHalf } from "lucide-react";
// import { Toast } from "@/components/ui/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast"
import { router } from "@inertiajs/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const ProductDetails = ({
    productdetails,
    singleproduct,
    relatedproducts,
    reviews,
}) => {
    // console.log("Related products:", relatedproducts);
    // console.log("Product details:", productdetails);
    // console.log("Single product:", singleproduct);
    // console.log("Reviews:", reviews);
    // console.log("Product details:", productdetails);
    const { toast } = useToast();

    const { auth } = usePage().props;

    // console.log("auth", auth);

    // Extract images into an array
    const productImages = [
        `${productdetails.img1}`,
        `${productdetails.img2}`,
        `${productdetails.img3}`,
        `${productdetails.img4}`,
    ].filter(Boolean); // Remove any undefined/null values

    const images = [
        productdetails.img1,
        productdetails.img2,
        productdetails.img3,
        productdetails.img4,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Previous Image
    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Next Image
    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

    // const { data, setData, post, processing } = useForm({
    //     product_id: singleproduct.id,
    //     color: "",
    //     size: "",
    //     qty: 1,
    //     price: singleproduct.price,
    // });

    const { data, setData, post, processing, reset } = useForm({
        description: "",
        rating: 0,
        image: null,
        product_id: productdetails.id,
    });
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // {console.log("size",productdetails.size)}
    const cartForm = useForm({
        product_id: singleproduct.id,
        color: selectedColor,
        size: selectedSize,
        qty: 1,
        price: singleproduct.price,
    });

    const wishlistForm = useForm({
        product_id: singleproduct.id,
    });

    // Handle quantity change
    const increaseQty = () => {
        cartForm.setData("qty", cartForm.data.qty + 1);
    };
    const decreaseQty = () => {
        cartForm.setData("qty", Math.max(1, cartForm.data.qty - 1));
    };

    // Submit Add to Cart
    const addToCart = (e) => {
        e.preventDefault();
        cartForm.post(route("cart.store"), {
            onSuccess: () => {
                reset("qty");
                toast({
                    title: "Added to Cart",
                    description:
                        "The product was added to your cart successfully!",
                });
            },
        });
    };

    // Submit Wishlist
    const addToWishlist = (e) => {
        e.preventDefault();
        wishlistForm.post(route("wishlist.store"), {
            onSuccess: () => {
                reset("qty");
                toast({
                    title: "Added to Wishlist",
                    description:
                        "The product was added to your wishlist successfully!",
                });
            },
        });
    };

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

    // Update form when selectedSize changes
    useEffect(() => {
        cartForm.setData("size", selectedSize);
    }, [selectedSize]);

    // Update form when selectedColor changes
    useEffect(() => {
        cartForm.setData("color", selectedColor);
    }, [selectedColor]);

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
<Alert className="max-w-7xl sm:mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-900 p-4 rounded-lg">
    <div className="flex items-center space-x-2">
        <Info className="h-5 w-5 text-orange-600" />
        <AlertTitle className="text-lg font-semibold">
            গুরুত্বপূর্ণ নির্দেশনা
        </AlertTitle>
    </div>
    <AlertDescription className="mt-2 text-sm">
        <span className="font-medium">1. প্রথমে লগইন করুন।</span> <br />
         2. লগইন ছাড়া আপনি <span className="font-medium">প্রোডাক্ট ক্রয়</span>,  
        <span className="font-medium"> উইশলিস্টে যোগ</span> অথবা  
        <span className="font-medium"> কার্টে সংযুক্ত</span> করতে পারবেন না। <br />
        3. প্রোডাক্ট উইশলিস্টে যোগ করতে চাইলে প্রথমে{" "}
        <span className="font-medium">"Add to Cart"</span> করুন। 
       
    </AlertDescription>
</Alert>


            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image Viewer */}
                        <div className="relative flex justify-center items-center">
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>

                            <img
                                src={`/${images[currentIndex]}`}
                                alt="Product"
                                className="w-64 h-64 object-cover rounded shadow-lg transition-all duration-300"
                            />

                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex space-x-2 overflow-x-auto mt-4 p-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)} // Fix: Use setCurrentIndex instead of setCurrentImage
                                    className={`flex-shrink-0 border-2 rounded-lg transition-all duration-300 ${
                                        currentIndex === index
                                            ? "ring-2 ring-orange-500"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={`/${img}`}
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
                                    <button
                                        onClick={addToWishlist}
                                        className="flex items-center text-gray-500"
                                        disabled={wishlistForm.processing}
                                    >
                                        <Heart className="h-5 w-5 mr-1" />
                                        {wishlistForm.processing
                                            ? "Saving..."
                                            : "Save"}
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
                            <div className="flex space-x-2">
                                {Array.isArray(productdetails.size)
                                    ? productdetails.size.map((size, index) => (
                                          <button
                                              key={index}
                                              onClick={() =>
                                                  setSelectedSize(size)
                                              }
                                              className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                                                  selectedSize === size
                                                      ? "bg-orange-500 text-white border-orange-500"
                                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                              }`}
                                          >
                                              {size}
                                          </button>
                                      ))
                                    : JSON.parse(productdetails.size).map(
                                          (size, index) => (
                                              <button
                                                  key={index}
                                                  onClick={() =>
                                                      setSelectedSize(size)
                                                  }
                                                  className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                                                      selectedSize === size
                                                          ? "bg-orange-500 text-white border-orange-500"
                                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                  }`}
                                              >
                                                  {size}
                                              </button>
                                          )
                                      )}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Color</h3>
                            <RadioGroup
                                value={selectedColor}
                                onValueChange={setSelectedColor}
                                className="flex space-x-3"
                            >
                                {/* {console.log("color", productdetails.color)} */}

                                {Array.isArray(productdetails.color)
                                    ? productdetails.color.map(
                                          (color, index) => (
                                              <RadioGroupItem
                                                  key={index}
                                                  value={color}
                                                  className={`w-8 h-8 rounded-full border ${
                                                      selectedColor === color
                                                          ? "ring-2 ring-orange-500"
                                                          : ""
                                                  }`}
                                                  style={{
                                                      backgroundColor: color,
                                                  }}
                                              />
                                          )
                                      )
                                    : JSON.parse(productdetails.color).map(
                                          (color, index) => (
                                              <RadioGroupItem
                                                  key={index}
                                                  value={color}
                                                  className={`w-8 h-8 rounded-full border ${
                                                      selectedColor === color
                                                          ? "ring-2 ring-orange-500"
                                                          : ""
                                                  }`}
                                                  style={{
                                                      backgroundColor: color,
                                                  }}
                                              />
                                          )
                                      )}
                            </RadioGroup>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Quantity</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={decreaseQty}
                                    className="p-2 border rounded-md"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center">
                                    {cartForm.data.qty}
                                </span>
                                <button
                                    onClick={increaseQty}
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
                            <button
                                onClick={() => {
                                    router.get("/checkout", {
                                        product_id: singleproduct.id, // Product ID
                                        quantity: cartForm.data.qty, // Quantity from cartForm
                                        size: selectedSize, // Selected size
                                        color: selectedColor, // Selected color
                                        price: singleproduct.price, // Product price
                                    });
                                }}
                                className="flex-1 text-center bg-green-500 text-white py-3 rounded-md hover:bg-green-600"
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={addToCart}
                                className="flex-1 border border-green-500 text-green-500 py-3 rounded-md hover:bg-orange-50"
                                disabled={cartForm.processing}
                            >
                                {cartForm.processing
                                    ? "Adding..."
                                    : "Add to Cart  "}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {auth.user ? (
                <h2 className="hidden"> you are logged in </h2>
            ) : (
                <h2 className="text-lg sm:text-md text-green-600  text-center font-semibold">
                    You have to login to post a review
                </h2>
            )}

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

                {/* review form */}
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

                {/* Review List */}
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
                                                        comment.image &&
                                                        comment.image.avatar
                                                            ? comment.image
                                                                  .avatar
                                                            : `/placeholder.svg`
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
                                                    {comment.user.name}
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
                                        {/* {console.log(comment.image)} */}
                                        {comment.image && (
                                            <img
                                                src={`/${comment.image}`}
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
                            {console.log(product.id)}
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
                                    ${parseFloat(product.price).toFixed(2)}
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
                                    variant="outline"
                                    className="w-full"
                                    size="sm"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    <Link
                                        href={route("product.show", product.id)}
                                    >
                                        {" "}
                                        View Details
                                    </Link>
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
