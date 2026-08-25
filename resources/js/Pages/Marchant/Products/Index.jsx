import DashboardLayout from "@/Layouts/marchant-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/Components/ui/input";
import { productImageSrc, imageFallback, formatCurrency } from "@/lib/utils";
import { Pencil, Search, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MarchantProducts({ products, filters = {} }) {
    const { toast } = useToast();
    const { delete: destroy } = useForm();
    const [deletingId, setDeletingId] = useState(null);
    const [search, setSearch] = useState(filters.q || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("merchant.products.index"),
            search.trim() ? { q: search.trim() } : {},
            { preserveState: true }
        );
    };

    const handleDelete = (id) => {
        setDeletingId(id);
        destroy(route("merchant.products.destroy", id), {
            onSuccess: () => {
                toast({ title: "Product deleted successfully!" });
            },
            onError: () => {
                toast({
                    title: "Error deleting product!",
                    variant: "destructive",
                });
            },
            onFinish: () => {
                setDeletingId(null);
            },
        });
    };

    return (
        <DashboardLayout>
            <Card className="mx-auto max-w-6xl">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Merchant Products</CardTitle>
                    <form onSubmit={handleSearch} className="w-full sm:max-w-xs">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="pl-8"
                            />
                        </div>
                    </form>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <img
                                                src={productImageSrc(product.image)}
                                                alt={product.title}
                                                onError={imageFallback}
                                                className="h-16 w-16 rounded-md border bg-white object-contain"
                                            />
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{formatCurrency(product.price)}</TableCell>
                                        <TableCell>
                                            {product.discount}%
                                        </TableCell>
                                        <TableCell>
                                            {product.category?.categoryName ||
                                                "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {product.brand?.brandName || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                                >
                                                    <Link
                                                        href={route(
                                                            "merchant.products.edit",
                                                            product.id
                                                        )}
                                                    >
                                                        <Pencil className="mr-1 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            disabled={
                                                                deletingId ===
                                                                product.id
                                                            }
                                                        >
                                                            <Trash2 className="mr-1 h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Are you sure you
                                                                want to delete this
                                                                product?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot
                                                                be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        product.id
                                                                    )
                                                                }
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Yes, Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan="7"
                                        className="text-center py-4"
                                    >
                                        No products found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
