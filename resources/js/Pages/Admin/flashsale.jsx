import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function FlashSales() {
    const { flashSales, products } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        product_id: "",
        discount_percentage: "",
        start_time: "",
        end_time: "",
    });
    
    const [editData, setEditData] = useState(null);
    const editForm = useForm(editData || { product_id: "", discount_percentage: "", start_time: "", end_time: "" });
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("flash_sales.store"), {
            onSuccess: () => {
                reset();
                toast({ title: "Success", description: "Flash sale added successfully!", variant: "default" });
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route("flash_sales.update", { flash_sale: editData.id }), {
            onSuccess: () => {
                setEditData(null);
                toast({ title: "Success", description: "Flash sale updated successfully!", variant: "default" });
            },
        });
    };

    const handleDelete = (id) => {
        editForm.delete(route("flash_sales.destroy", { flash_sale: id }), {
            onSuccess: () => toast({ title: "Deleted", description: "Flash sale deleted successfully!", variant: "destructive" }),
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
                            <TableCell>{sale.product.name}</TableCell>
                            <TableCell>{sale.discount_percentage}%</TableCell>
                            <TableCell>{sale.start_time}</TableCell>
                            <TableCell>{sale.end_time}</TableCell>
                            <TableCell className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setEditData(sale)}>Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Flash Sale</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleEditSubmit} className="space-y-4">
                                            <div>
                                                <Label>Discount (%)</Label>
                                                <Input type="number" min="0" max="100" value={editForm.data.discount_percentage} onChange={(e) => editForm.setData("discount_percentage", e.target.value)} required />
                                            </div>
                                            <div>
                                                <Label>Start Time</Label>
                                                <Input type="datetime-local" value={editForm.data.start_time} onChange={(e) => editForm.setData("start_time", e.target.value)} required />
                                            </div>
                                            <div>
                                                <Label>End Time</Label>
                                                <Input type="datetime-local" value={editForm.data.end_time} onChange={(e) => editForm.setData("end_time", e.target.value)} required />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" disabled={editForm.processing}>{editForm.processing ? "Updating..." : "Update Flash Sale"}</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <Button onClick={() => handleDelete(sale.id)} variant="destructive">Confirm</Button>
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
                        <select className="w-full border p-2 rounded" value={data.product_id} onChange={(e) => setData("product_id", e.target.value)} required>
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label>Discount (%)</Label>
                        <Input type="number" min="0" max="100" value={data.discount_percentage} onChange={(e) => setData("discount_percentage", e.target.value)} required />
                    </div>
                    <div>
                        <Label>Start Time</Label>
                        <Input type="datetime-local" value={data.start_time} onChange={(e) => setData("start_time", e.target.value)} required />
                    </div>
                    <div>
                        <Label>End Time</Label>
                        <Input type="datetime-local" value={data.end_time} onChange={(e) => setData("end_time", e.target.value)} required />
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? "Adding..." : "Add Flash Sale"}</Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
