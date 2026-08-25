import { useState } from "react";
import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import CategoryImage from "@/Components/CategoryImage";
import ImageField from "@/Components/ImageField";

export default function Categories() {
    const { categories } = usePage().props;
    const [editingCategory, setEditingCategory] = useState(null);
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        clearErrors,
        transform,
    } = useForm({
        categoryName: "",
        categoryImg: "",
    });
    const { delete: destroy } = useForm();
    const { toast } = useToast();

    const resetForm = () => {
        reset();
        clearErrors();
        setEditingCategory(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEditing = Boolean(editingCategory);
        const submitUrl = isEditing
            ? route("admin.categories.update", { category: editingCategory.id })
            : route("admin.categories.store");

        transform((formData) =>
            isEditing ? { ...formData, _method: "put" } : formData,
        );

        post(submitUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                resetForm();
                toast({
                    title: isEditing
                        ? "Category updated successfully!"
                        : "Category added successfully!",
                });
            },
        });
    };

    const handleEdit = (category) => {
        clearErrors();
        setEditingCategory(category);
        setData({
            categoryName: category.categoryName,
            categoryImg: category.categoryImg || "",
        });
    };

    const handleDelete = (id) => {
        destroy(route("admin.categories.destroy", { category: id }), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingCategory?.id === id) {
                    resetForm();
                }
                toast({ title: "Category deleted" });
            },
        });
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.categoryName}</TableCell>
                                <TableCell>
                                    <CategoryImage
                                        src={category.categoryImg}
                                        alt={category.categoryName}
                                        className="h-16 w-16 rounded-md border border-gray-200"
                                        showLabel={false}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(category)}
                                        >
                                            Edit
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete the
                                                        category "{category.categoryName}".
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <Button variant="outline">Cancel</Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDelete(category.id)
                                                        }
                                                    >
                                                        Confirm Delete
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-8 bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                        <Label>Category Name</Label>
                        <Input
                            type="text"
                            placeholder="e.g. Mobiles & Tablets"
                            value={data.categoryName}
                            onChange={(e) => setData("categoryName", e.target.value)}
                            required
                        />
                        {errors?.categoryName && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.categoryName}
                            </p>
                        )}
                    </div>
                    <div>
                        <ImageField
                            key={editingCategory?.id || "new-category"}
                            label="Category Image"
                            recommendation="Ratio 1:1 (square) · recommended 400×400px · max size 5MB · JPG / PNG / WEBP"
                            value={data.categoryImg}
                            previewSrc={
                                typeof data.categoryImg === "string"
                                    ? data.categoryImg
                                    : null
                            }
                            error={errors?.categoryImg}
                            onChange={(val) => setData("categoryImg", val)}
                        />
                        {editingCategory && data.categoryImg && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-red-600 hover:text-red-700"
                                onClick={() => setData("categoryImg", "")}
                            >
                                Remove current image
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? editingCategory
                                    ? "Updating..."
                                    : "Adding..."
                                : editingCategory
                                  ? "Update Category"
                                  : "Add Category"}
                        </Button>
                        {editingCategory && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                disabled={processing}
                            >
                                Cancel Edit
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
