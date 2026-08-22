import MarchantDashboardLayout from "@/Layouts/marchant-layout";
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

export default function Brands() {
    const { brands, errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        brandName: "",
        brandImg: "",
    });
    const { delete: destroy } = useForm();
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("merchant.brands.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast({ title: "Brand added successfully!" });
            },
        });
    };

    const handleDelete = (id) => {
        destroy(route("merchant.brands.destroy", { id }), {
            onSuccess: () => toast({ title: "Brand deleted" }),
        });
    };

    return (
        <MarchantDashboardLayout>
            <div className="mx-auto max-w-5xl px-4 sm:px-0 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Brands
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Brands you create here appear in the product form.
                    </p>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Brand Name</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {brands.length > 0 ? (
                                brands.map((brand) => (
                                    <TableRow key={brand.id}>
                                        <TableCell>{brand.brandName}</TableCell>
                                        <TableCell>
                                            {brand.brandImg ? (
                                                <img
                                                    src={imageSrc(brand.brandImg)}
                                                    alt={brand.brandName}
                                                    className="h-10 w-16 object-contain rounded"
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    No logo
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
                                                            This will permanently delete
                                                            the brand "{brand.brandName}".
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <Button variant="outline">Cancel</Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() =>
                                                                handleDelete(brand.id)
                                                            }
                                                        >
                                                            Confirm Delete
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="3" className="text-center text-gray-400">
                                        No brands yet. Create your first brand below.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Add New Brand */}
                <div className="mt-8 bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Add New Brand</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                            <Label>Brand Name</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Samsung, Apple"
                                value={data.brandName}
                                onChange={(e) => setData("brandName", e.target.value)}
                                required
                            />
                            {errors?.brandName && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.brandName}
                                </p>
                            )}
                        </div>
                        <div>
                            <ImageField
                                label="Brand Logo"
                                recommendation="Ratio 1:1 (square) · recommended 300×300px · max size 1MB · JPG / PNG / WEBP"
                                value={data.brandImg}
                                error={errors?.brandImg}
                                onChange={(val) => setData("brandImg", val)}
                            />
                        </div>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Adding..." : "Add Brand"}
                        </Button>
                    </form>
                </div>
            </div>
        </MarchantDashboardLayout>
    );
}
