import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MarchantDashboardLayout from "@/Layouts/marchant-layout";

export default function CreateProduct({ category, brands }) {
    console.log("brands", brands);
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        short_des: "",
        price: "",
        discount: "0",
        image: null,
        star: "",
        status: "active",
        category_id: "",
        brand_id: "",
        // Product Details
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        des: "",
        color: [],
        size: [],
    });

    const handleImageChange = (e, field) => {
        setData(field, e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setData("discount", data.discount || "0"); // Default to 0 if empty

        post(route("merchant.products.store"), {
            onSuccess: () => {
                toast({ title: "Product created successfully!" });
                reset();
            },
            onError: () => {
                toast({
                    title: "Error creating product!",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <MarchantDashboardLayout>
            <Card className="mx-auto max-w-4xl">
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="border rounded-md p-4">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Title</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Short Description</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="text"
                                                value={data.short_des}
                                                onChange={(e) =>
                                                    setData(
                                                        "short_des",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Price</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="number"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Discount (%)</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="number"
                                                value={data.discount}
                                                onChange={(e) =>
                                                    setData(
                                                        "discount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Main Image</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="file"
                                                onChange={(e) =>
                                                    handleImageChange(
                                                        e,
                                                        "image"
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Star Rating</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="number"
                                                step="0.1"
                                                max="5"
                                                value={data.star}
                                                onChange={(e) =>
                                                    setData(
                                                        "star",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Category</Label>
                                        </td>
                                        <td className="p-2">
                                            <Select
                                                value={data.category_id}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "category_id",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {category.map((cat) => (
                                                        <SelectItem
                                                            key={cat.id}
                                                            value={cat.id.toString()}
                                                        >
                                                            {cat.categoryName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Brand</Label>
                                        </td>
                                        <td className="p-2">
                                            <Select
                                                value={data.brand_id}
                                                onValueChange={(value) =>
                                                    setData("brand_id", value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem
                                                            key={brand.id}
                                                            value={brand.id.toString()}
                                                        >
                                                            {brand.brandName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.brand_id && (
                                                <p className="text-red-500">
                                                    {errors.brand_id}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Color</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter colors (comma-separated)"
                                                value={data.color.join(", ")}
                                                onChange={(e) =>
                                                    setData(
                                                        "color",
                                                        e.target.value
                                                            .split(",")
                                                            .map((c) =>
                                                                c.trim()
                                                            )
                                                    )
                                                }
                                            />
                                            {errors.color && (
                                                <p className="text-red-500">
                                                    {errors.color}
                                                </p>
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-2">
                                            <Label>Size</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="text"
                                                placeholder="Enter sizes (comma-separated)"
                                                value={data.size.join(", ")}
                                                onChange={(e) =>
                                                    setData(
                                                        "size",
                                                        e.target.value
                                                            .split(",")
                                                            .map((s) =>
                                                                s.trim()
                                                            )
                                                    )
                                                }
                                            />
                                            {errors.size && (
                                                <p className="text-red-500">
                                                    {errors.size}
                                                </p>
                                            )}
                                        </td>
                                    </tr>

                                    {/* Product Details Section */}
                                    <tr>
                                        <td className="p-2">
                                            <Label>Description</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="text"
                                                value={data.des}
                                                onChange={(e) =>
                                                    setData(
                                                        "des",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <Label>Images (4)</Label>
                                        </td>
                                        <td className="p-2">
                                            <Input
                                                type="file"
                                                onChange={(e) =>
                                                    handleImageChange(e, "img1")
                                                }
                                            />
                                            <Input
                                                type="file"
                                                onChange={(e) =>
                                                    handleImageChange(e, "img2")
                                                }
                                            />
                                            <Input
                                                type="file"
                                                onChange={(e) =>
                                                    handleImageChange(e, "img3")
                                                }
                                            />
                                            <Input
                                                type="file"
                                                onChange={(e) =>
                                                    handleImageChange(e, "img4")
                                                }
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? "Creating..." : "Create Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </MarchantDashboardLayout>
    );
}
