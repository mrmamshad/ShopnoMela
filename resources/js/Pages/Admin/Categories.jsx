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
import { imageSrc } from "@/lib/utils";
import ImageField from "@/Components/ImageField";

export default function Categories() {
    const { categories, errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        categoryName: "",
        categoryImg: "",
    });
    const { delete: destroy } = useForm();
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast({ title: "Category added successfully!" });
            },
        });
    };

    const handleDelete = (id) => {
        destroy(route("admin.categories.destroy", { category: id }), {
            onSuccess: () => toast({ title: "Category deleted" }),
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
                                    {category.categoryImg ? (
                                        <img
                                            src={imageSrc(category.categoryImg)}
                                            alt={category.categoryName}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            No image
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add New Category */}
            <div className="mt-8 bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
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
                            label="Category Image"
                            recommendation="Ratio 1:1 (square) · recommended 400×400px · max size 1MB · JPG / PNG / WEBP"
                            value={data.categoryImg}
                            error={errors?.categoryImg}
                            onChange={(val) => setData("categoryImg", val)}
                        />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Adding..." : "Add Category"}
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
