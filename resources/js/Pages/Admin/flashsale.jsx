import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { router } from "@inertiajs/react";

export default function FlashSales() {
    const { flashSales, products } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        product_id: "",
        discount_percentage: "",
        start_time: new Date().toISOString().slice(0, 16),
        end_time: new Date().toISOString().slice(0, 16), // Default to current time
    });

    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("flash-sales.store"), {
            onSuccess: () => {
                reset();
                toast({
                    title: "Success",
                    description: "Flash sale added successfully!",
                    variant: "default",
                });
                
            },
        });
    };

    const deleteFlashSale = (id) => {
        router.delete(`/admin/flash-sales/${id}`, {
            onSuccess: () => {
                toast({
                    title: "Deleted",
                    description: "Flash sale deleted successfully!",
                    variant: "destructive",
                });
            },
            onError: (errors) => {
                console.error("Error deleting:", errors);
            },
        });
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Manage Flash Sales</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Discount (%)</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flashSales.map((sale) => (
                        <TableRow key={sale.id}>
                            <TableCell>{sale.product?.title}</TableCell>
                            <TableCell>{sale.discount_percentage}%</TableCell>
                            <TableCell>{sale.start_time}</TableCell>
                            <TableCell>{sale.end_time}</TableCell>
                            <TableCell className="flex gap-2">
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
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Button
                                                    onClick={() =>
                                                        deleteFlashSale(sale.id)
                                                    }
                                                    variant="destructive"
                                                >
                                                    Confirm
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-10 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add Flash Sale</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Product</Label>
                        <select
                            className="w-full border p-2 rounded"
                            value={data.product_id}
                            onChange={(e) =>
                                setData("product_id", e.target.value)
                            }
                            required
                        >
                            <option value="">Select Product</option>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.title}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No Products Available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <Label>Discount (%)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={data.discount_percentage}
                            onChange={(e) =>
                                setData("discount_percentage", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label>Start Time</Label>
                        <Input
                            type="datetime-local"
                            value={
                                data.start_time
                                    ? data.start_time.substring(0, 16)
                                    : ""
                            }
                            onChange={(e) =>
                                setData("start_time", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <Label>End Time</Label>
                        <Input
                            type="datetime-local"
                            value={
                                data.end_time
                                    ? data.end_time.substring(0, 16)
                                    : ""
                            }
                            onChange={(e) =>
                                setData("end_time", e.target.value)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Adding..." : "Add Flash Sale"}
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
