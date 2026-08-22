import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { ImagePlus, Info } from "lucide-react";
import { imageSrc } from "@/lib/utils";

const IMAGE_RATIO = "3:1 (wide banner)";
const IMAGE_RECOMMENDATION = `Ratio ${IMAGE_RATIO} · recommended 1920×640px · max size 2MB · JPG / PNG / WEBP`;

function ImageField({ value, error, onChange, previewSrc }) {
    const [filePreview, setFilePreview] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image must be 2MB or smaller.");
                e.target.value = "";
                return;
            }
            setFilePreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    return (
        <div>
            <Label>Upload Banner Image</Label>
            <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFile}
                className="mt-1"
            />
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                <Info className="h-4 w-4 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700">{IMAGE_RECOMMENDATION}</p>
            </div>

            {filePreview || previewSrc ? (
                <img
                    src={filePreview || imageSrc(previewSrc)}
                    alt="Banner preview"
                    className="mt-2 w-full max-h-40 object-contain rounded border"
                />
            ) : (
                <div className="mt-2 flex items-center justify-center gap-2 rounded border-2 border-dashed border-gray-300 py-6 text-gray-400">
                    <ImagePlus className="h-5 w-5" />
                    <span className="text-xs">Banner preview will appear here</span>
                </div>
            )}

            <div className="mt-3">
                <Label>Or paste an image URL</Label>
                <Input
                    type="text"
                    placeholder="https://example.com/banner.jpg"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => {
                        setFilePreview(null);
                        onChange(e.target.value);
                    }}
                    className="mt-1"
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

export default function Slider() {
    const { offers, errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        title: "",
        image: "",
        discount: "",
        valid_until: "",
        types: "",
    });

    const [editData, setEditData] = useState(null);
    const editForm = useForm({ title: "", image: "", discount: "", valid_until: "", types: "" });
    const { toast } = useToast();

    // Load the offer's current values into the edit form when Edit is clicked
    useEffect(() => {
        if (editData) {
            editForm.setData({
                title: editData.title || "",
                image: editData.image || "",
                discount: editData.discount || "",
                valid_until: editData.valid_until ? editData.valid_until.slice(0, 10) : "",
                types: editData.types || "",
            });
        }
    }, [editData?.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("offers.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast({ title: "Success", description: "Offer added successfully!", variant: "default" });
            },
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route("offers.update", { offer: editData.id }), {
            forceFormData: true,
            onSuccess: () => {
                setEditData(null);
                toast({ title: "Success", description: "Offer updated successfully!", variant: "default" });
            },
        });
    };

    const handleDelete = (id) => {
        editForm.delete(route("offers.destroy", { offer: id }), {
            onSuccess: () => toast({ title: "Deleted", description: "Offer deleted successfully!", variant: "destructive" }),
        });
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">Manage Offers</h1>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Valid Until</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow key={offer.id}>
                                <TableCell>{offer.title}</TableCell>
                                <TableCell>
                                    <img
                                        src={imageSrc(offer.image)}
                                        alt={offer.title}
                                        className="w-16 h-16 object-cover rounded"
                                        onError={(e) => { e.target.src = "/product_images/demo/cat-1.png"; }}
                                    />
                                </TableCell>
                                <TableCell>{offer.discount}%</TableCell>
                                <TableCell>{offer.types}</TableCell>
                                <TableCell>{offer.valid_until}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => setEditData(offer)}>
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Offer</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                                <div>
                                                    <Label>Offer Title</Label>
                                                    <Input
                                                        type="text"
                                                        value={editForm.data.title}
                                                        onChange={(e) => editForm.setData("title", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <ImageField
                                                    value={editForm.data.image}
                                                    previewSrc={editForm.data.image}
                                                    error={errors?.image}
                                                    onChange={(val) => editForm.setData("image", val)}
                                                />
                                                <div>
                                                    <Label>Discount (%)</Label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={editForm.data.discount}
                                                        onChange={(e) => editForm.setData("discount", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Valid Until</Label>
                                                    <Input
                                                        type="date"
                                                        value={editForm.data.valid_until}
                                                        onChange={(e) => editForm.setData("valid_until", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" disabled={editForm.processing}>
                                                        {editForm.processing ? "Updating..." : "Update Offer"}
                                                    </Button>
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
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the offer.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button variant="destructive" onClick={() => handleDelete(offer.id)}>
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

            {/* Add New Offer Form */}
            <div className="mt-10 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Offer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Offer Title</Label>
                        <Input type="text" value={data.title} onChange={(e) => setData("title", e.target.value)} required />
                    </div>
                    <ImageField
                        value={data.image}
                        error={errors?.image}
                        onChange={(val) => setData("image", val)}
                    />
                    <div>
                        <Label>Discount (%)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={data.discount}
                            onChange={(e) => setData("discount", e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label>Product Type</Label>
                        <Input type="text" value={data.types} onChange={(e) => setData("types", e.target.value)} required />
                    </div>
                    <div>
                        <Label>Valid Until</Label>
                        <Input type="date" value={data.valid_until} onChange={(e) => setData("valid_until", e.target.value)} required />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Adding..." : "Add Offer"}
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
