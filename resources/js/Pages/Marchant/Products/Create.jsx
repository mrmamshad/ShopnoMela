import { useState, useRef } from "react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
} from "@/Components/ui/card";
import {
    ImagePlus,
    Star,
    Trash2,
    Info,
    Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MarchantDashboardLayout from "@/Layouts/marchant-layout";
import { cn } from "@/lib/utils";

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_KB = 5120;
const IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
    "image/webp",
    "image/avif",
    "image/heic",
    "image/heif",
];

const IMAGE_NOTE = `সব ছবি বর্গাকার (১:১) দিন — প্রস্তাবিত রেজ্যুলেশন ৮০০×৮০০ পিক্সেল বা তার বেশি, সর্বোচ্চ ৫MB — JPG / PNG / WEBP`;
const IMAGE_NOTE_EN = "Square (1:1) · recommended 800×800px or larger · max 5MB · JPG / PNG / WEBP";

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function ImageDropzone({ label, preview, error, onFile }) {
    const inputRef = useRef(null);
    const [localError, setLocalError] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) {
            onFile(null);
            return;
        }
        if (!IMAGE_TYPES.includes(file.type)) {
            setLocalError(
                "Only image files are allowed (JPG, PNG, WEBP, GIF, BMP, SVG, AVIF, HEIC)."
            );
            onFile(null);
            e.target.value = "";
            return;
        }
        if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
            setLocalError(
                `Maximum ${MAX_IMAGE_SIZE_MB}MB allowed (${(
                    file.size /
                    1024 /
                    1024
                ).toFixed(2)}MB selected).`
            );
            onFile(null);
            e.target.value = "";
            return;
        }
        setLocalError(null);
        onFile(file);
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={cn(
                    "group relative flex flex-col items-center justify-center w-full aspect-square rounded-xl border-2 border-dashed transition-all overflow-hidden",
                    preview
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/50"
                )}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt={label}
                            className="w-full h-full object-contain bg-white"
                        />
                        <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                            <Trash2 className="w-4 h-4" /> Change
                        </span>
                    </>
                ) : (
                    <>
                        <ImagePlus className="w-7 h-7 text-gray-400 group-hover:text-green-500 transition-colors" />
                        <span className="mt-1 text-xs font-medium text-gray-500">
                            {label}
                            {label === "Main Image" && (
                                <span className="text-red-500"> *</span>
                            )}
                        </span>
                        <span className="mt-0.5 text-[10px] text-gray-400">
                            Upload
                        </span>
                    </>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={IMAGE_TYPES.join(",")}
                    onChange={handleFile}
                    className="hidden"
                />
            </button>
            <FieldError message={localError || error} />
        </div>
    );
}

function Section({ title, icon: Icon, children, noBorder }) {
    return (
        <div className={cn("pb-5", !noBorder && "border-b border-gray-100")}>
            <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 rounded-md bg-green-50 text-green-600">
                    <Icon className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-semibold text-gray-700">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

function Field({ label, required, error, children }) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </Label>
            <div className="mt-1">{children}</div>
            <FieldError message={error} />
        </div>
    );
}

export default function CreateProduct({ category, brands }) {
    const { toast } = useToast();
    const [previews, setPreviews] = useState({});
    const [brandDialogOpen, setBrandDialogOpen] = useState(false);
    const brandForm = useForm({ brandName: "", brandImg: "" });

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
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        des: "",
        color: [],
        size: [],
        attributes: [],
    });

    // Dynamic variant attribute helpers
    const addAttribute = () =>
        setData("attributes", [
            ...data.attributes,
            { name: "", values: [] },
        ]);

    const removeAttribute = (index) =>
        setData(
            "attributes",
            data.attributes.filter((_, i) => i !== index)
        );

    const updateAttributeName = (index, name) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === index ? { ...attr, name } : attr
            )
        );

    // Add a single option (with its own price adjustment) to an attribute
    const addOption = (attrIndex) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === attrIndex
                    ? {
                          ...attr,
                          values: [
                              ...attr.values,
                              { label: "", price: "0" },
                          ],
                      }
                    : attr
            )
        );

    const removeOption = (attrIndex, optIndex) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === attrIndex
                    ? {
                          ...attr,
                          values: attr.values.filter(
                              (_, oi) => oi !== optIndex
                          ),
                      }
                    : attr
            )
        );

    const updateOption = (attrIndex, optIndex, field, value) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === attrIndex
                    ? {
                          ...attr,
                          values: attr.values.map((opt, oi) =>
                              oi === optIndex
                                  ? { ...opt, [field]: value }
                                  : opt
                          ),
                      }
                    : attr
            )
        );

    const handleImageChange = (file, field) => {
        setData(field, file || null);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviews((prev) => ({ ...prev, [field]: url }));
        } else {
            setPreviews((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("merchant.products.store"), {
            forceFormData: true,
            onSuccess: () => {
                toast({ title: "Product created successfully!" });
                reset();
                setPreviews({});
            },
            onError: (errs) => {
                const messages = Object.values(errs || []);
                const count = messages.length;
                toast({
                    title: count > 1
                        ? `${count} fields need attention`
                        : "Please fix the highlighted field",
                    description:
                        messages
                            .slice(0, 3)
                            .join(" • ") || "Please fix the highlighted fields.",
                    variant: "destructive",
                });
            },
        });
    };

    const submitBrand = (e) => {
        e.preventDefault();
        brandForm.post(route("merchant.brands.store"), {
            onSuccess: () => {
                brandForm.reset();
                setBrandDialogOpen(false);
                toast({ title: "Brand created!", description: "Refresh the page to see it in the list." });
            },
        });
    };

    const imageSlots = [
        { field: "image", label: "Main Image" },
        { field: "img1", label: "Image 1" },
        { field: "img2", label: "Image 2" },
        { field: "img3", label: "Image 3" },
        { field: "img4", label: "Image 4" },
    ];

    return (
        <MarchantDashboardLayout>
            <div className="mx-auto max-w-5xl px-4 sm:px-0 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create Product
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add a new product to your store
                    </p>
                </div>

                <Card className="shadow-sm">
                    <CardContent className="p-6 space-y-6">
                        <form onSubmit={handleSubmit}>
                            {/* Basic info */}
                            <Section title="Product Information" icon={Star}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field
                                        label="Title"
                                        required
                                        error={errors.title}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="e.g. Samsung Galaxy S24"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Short Description"
                                        required
                                        error={errors.short_des}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="One line summary"
                                            value={data.short_des}
                                            onChange={(e) =>
                                                setData(
                                                    "short_des",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Price (৳)"
                                        required
                                        error={errors.price}
                                    >
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="0.00"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData(
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Discount (%)"
                                        error={errors.discount}
                                    >
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="0"
                                            value={data.discount}
                                            onChange={(e) =>
                                                setData(
                                                    "discount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field
                                        label="Star Rating"
                                        error={errors.star}
                                    >
                                        <Input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            placeholder="0 - 5"
                                            value={data.star}
                                            onChange={(e) =>
                                                setData(
                                                    "star",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field label="Status">
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData("status", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                            </Section>

                            {/* Category, brand, variations */}
                            <Section title="Category & Variations" icon={ImagePlus}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field
                                        label="Category"
                                        required
                                        error={errors.category_id}
                                    >
                                        <Select
                                            value={data.category_id}
                                            onValueChange={(value) =>
                                                setData("category_id", value)
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
                                    </Field>
                                    <Field
                                        label="Brand"
                                        required
                                        error={errors.brand_id}
                                    >
                                        <Select
                                            value={data.brand_id}
                                            onValueChange={(value) => {
                                                if (value === "__create__") {
                                                    setBrandDialogOpen(true);
                                                } else {
                                                    setData("brand_id", value);
                                                }
                                            }}
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
                                                <SelectItem value="__create__">
                                                    <span className="flex items-center gap-2 font-medium text-green-600">
                                                        <Plus className="h-4 w-4" />
                                                        Create new brand
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field label="Color" error={errors.color}>
                                        <Input
                                            type="text"
                                            placeholder="Red, Blue, Black"
                                            value={data.color.join(", ")}
                                            onChange={(e) =>
                                                setData(
                                                    "color",
                                                    e.target.value
                                                        .split(",")
                                                        .map((c) => c.trim())
                                                )
                                            }
                                        />
                                    </Field>
                                    <Field label="Size" error={errors.size}>
                                        <Input
                                            type="text"
                                            placeholder="S, M, L, XL"
                                            value={data.size.join(", ")}
                                            onChange={(e) =>
                                                setData(
                                                    "size",
                                                    e.target.value
                                                        .split(",")
                                                        .map((s) => s.trim())
                                                )
                                            }
                                        />
                                    </Field>
                                </div>

                                {/* Custom / dynamic variants */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800">
                                                Other Variants
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                Color/Size optional. For other
                                                products add your own variants —
                                                e.g. RAM, Storage, Weight,
                                                Flavor, Material.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addAttribute}
                                            className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                                        >
                                            <Plus className="h-4 w-4" /> Add
                                            Variant
                                        </button>
                                    </div>

                                    {data.attributes.length === 0 && (
                                        <p className="text-xs text-gray-400 italic">
                                            No custom variants added.
                                        </p>
                                    )}

                                    {data.attributes.map((attr, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg border p-3 bg-gray-50 space-y-3"
                                        >
                                            <div className="flex items-end gap-3">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block">
                                                        Variant name
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="e.g. RAM"
                                                        value={attr.name}
                                                        onChange={(e) =>
                                                            updateAttributeName(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAttribute(index)
                                                    }
                                                    className="p-2 text-red-500 hover:text-red-600"
                                                    aria-label="Remove variant"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs text-gray-500 block">
                                                        Options and price
                                                    </label>
                                                    <span className="text-[11px] text-gray-400">
                                                        Extra price added to base
                                                        price (৳)
                                                    </span>
                                                </div>

                                                {attr.values.length === 0 && (
                                                    <p className="text-xs text-gray-400 italic">
                                                        No options yet. Click
                                                        Add option below.
                                                    </p>
                                                )}

                                                {attr.values.map(
                                                    (opt, optIndex) => (
                                                        <div
                                                            key={optIndex}
                                                            className="grid grid-cols-[2fr_1fr_auto] gap-2 items-center"
                                                        >
                                                            <Input
                                                                type="text"
                                                                placeholder="e.g. 16GB"
                                                                value={
                                                                    opt.label
                                                                }
                                                                onChange={(e) =>
                                                                    updateOption(
                                                                        index,
                                                                        optIndex,
                                                                        "label",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                                    +৳
                                                                </span>
                                                                <Input
                                                                    type="number"
                                                                    min="0"
                                                                    step="0.01"
                                                                    placeholder="0"
                                                                    className="pl-8"
                                                                    value={
                                                                        opt.price
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateOption(
                                                                            index,
                                                                            optIndex,
                                                                            "price",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeOption(
                                                                        index,
                                                                        optIndex
                                                                    )
                                                                }
                                                                className="p-2 text-red-400 hover:text-red-600"
                                                                aria-label="Remove option"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addOption(index)
                                                    }
                                                    className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />{" "}
                                                    Add option
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            {/* Description */}
                            <Section title="Description" icon={Info} noBorder>
                                <Field
                                    label="Full Description"
                                    required
                                    error={errors.des}
                                >
                                    <textarea
                                        rows="4"
                                        placeholder="Write a detailed description of your product..."
                                        value={data.des}
                                        onChange={(e) =>
                                            setData("des", e.target.value)
                                        }
                                        className={cn(
                                            "mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
                                        )}
                                    />
                                </Field>
                            </Section>

                            {/* Images */}
                            <Section title="Product Images" icon={ImagePlus}>
                                <div className="mb-4 flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5">
                                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-blue-700">
                                        {IMAGE_NOTE}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {imageSlots.map((slot) => (
                                        <ImageDropzone
                                            key={slot.field}
                                            label={slot.label}
                                            preview={previews[slot.field]}
                                            error={errors[slot.field]}
                                            onFile={(file) =>
                                                handleImageChange(
                                                    file,
                                                    slot.field
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </Section>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => reset()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Product"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Create Brand Dialog */}
            <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Brand</DialogTitle>
                        <DialogDescription>
                            Add a brand that will appear in the brand dropdown.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitBrand} className="space-y-4">
                        <div>
                            <Label>Brand Name</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Samsung, Apple, Nokia"
                                value={brandForm.data.brandName}
                                onChange={(e) =>
                                    brandForm.setData("brandName", e.target.value)
                                }
                                required
                            />
                            {brandForm.errors.brandName && (
                                <p className="mt-1 text-xs text-red-600">
                                    {brandForm.errors.brandName}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Logo URL (optional)</Label>
                            <Input
                                type="text"
                                placeholder="https://example.com/logo.png"
                                value={brandForm.data.brandImg}
                                onChange={(e) =>
                                    brandForm.setData("brandImg", e.target.value)
                                }
                            />
                            {brandForm.errors.brandImg && (
                                <p className="mt-1 text-xs text-red-600">
                                    {brandForm.errors.brandImg}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setBrandDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={brandForm.processing}>
                                {brandForm.processing
                                    ? "Creating..."
                                    : "Create Brand"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </MarchantDashboardLayout>
    );
}
