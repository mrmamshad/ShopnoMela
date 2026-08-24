import { useForm, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Search, Trash2, UserPlus, KeyRound, Plus, Percent } from "lucide-react";
import { Input } from "@/Components/ui/input";
import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function MerchantList({ merchants, filters = {}, summary = {} }) {
    const { post } = useForm();
    const [search, setSearch] = useState(filters.q || "");

    const bdt = (n) =>
        "৳" +
        Number(n || 0).toLocaleString("en-BD", { maximumFractionDigits: 2 });

    // Add Merchant dialog
    const [addOpen, setAddOpen] = useState(false);
    const addForm = useForm({
        name: "",
        email: "",
        phone: "",
        commission_rate: "",
        password: "",
        password_confirmation: "",
    });

    // Set Commission dialog
    const [commissionTarget, setCommissionTarget] = useState(null);
    const commissionForm = useForm({ rate: "" });

    const submitCommission = (e) => {
        e.preventDefault();
        if (!commissionTarget) return;
        commissionForm.post(
            route("admin.merchants.commission", { id: commissionTarget.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    commissionForm.reset();
                    setCommissionTarget(null);
                    toast({
                        title: "Commission updated",
                        description: "The commission rate has been saved.",
                    });
                },
                onError: () =>
                    toast({
                        title: "Error",
                        description: "Enter a rate between 0 and 100.",
                        variant: "destructive",
                    }),
            }
        );
    };

    // Reset Password dialog
    const [resetTarget, setResetTarget] = useState(null); // merchant object
    const resetForm = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("marchantlist"),
            search.trim() ? { q: search.trim() } : {},
            { preserveState: true }
        );
    };

    const handleTakeOver = (id) => {
        post(route("admin.takeOverMerchant", { id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Role Taken Over",
                    description:
                        "The merchant role has been removed, and the user is now a customer.",
                    variant: "destructive",
                });
            },
        });
    };

    const submitAddMerchant = (e) => {
        e.preventDefault();
        addForm.post(route("admin.merchants.store"), {
            preserveScroll: true,
            onSuccess: () => {
                addForm.reset();
                setAddOpen(false);
                toast({
                    title: "Merchant created",
                    description: "The new merchant account is ready.",
                });
            },
            onError: () =>
                toast({
                    title: "Error",
                    description: "Please fix the highlighted fields.",
                    variant: "destructive",
                }),
        });
    };

    const submitResetPassword = (e) => {
        e.preventDefault();
        if (!resetTarget) return;
        resetForm.post(
            route("admin.merchants.reset-password", { id: resetTarget.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    resetForm.reset();
                    setResetTarget(null);
                    toast({
                        title: "Password reset",
                        description: "The merchant password has been updated.",
                    });
                },
                onError: () =>
                    toast({
                        title: "Error",
                        description: "Please fix the highlighted fields.",
                        variant: "destructive",
                    }),
            }
        );
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                    <h2 className="text-3xl font-semibold">🛍️ All Merchants</h2>
                    <Button
                        onClick={() => setAddOpen(true)}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Merchant
                    </Button>
                </div>

                {/* Platform commission summary */}
                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="rounded-lg border p-4 bg-blue-50">
                        <p className="text-sm text-blue-700">
                            Total Merchant Sales
                        </p>
                        <p className="text-2xl font-bold text-blue-800">
                            {bdt(summary.total_sales)}
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 bg-emerald-50">
                        <p className="text-sm text-emerald-700">
                            Total Commission Earned
                        </p>
                        <p className="text-2xl font-bold text-emerald-800">
                            {bdt(summary.total_commission)}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSearch} className="mb-4 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="pl-8"
                        />
                    </div>
                </form>

                <div className="overflow-x-auto">
                    <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-16 text-center">
                                    ID
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">
                                    Commission
                                </TableHead>
                                <TableHead className="text-right">
                                    Orders / Sales
                                </TableHead>
                                <TableHead className="text-right">
                                    Commission / Net
                                </TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {merchants.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground py-6"
                                    >
                                        No merchants found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {merchants.map((merchant) => (
                                <TableRow
                                    key={merchant.id}
                                    className="hover:bg-gray-50"
                                >
                                    <TableCell className="text-center">
                                        {merchant.id}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    merchant.avatar ||
                                                    "/placeholder.jpg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {merchant.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        {merchant.name}
                                    </TableCell>
                                    <TableCell>{merchant.email}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-50 text-emerald-700"
                                        >
                                            {merchant.commission_rate ?? 0}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                        <div className="font-medium">
                                            {merchant.earnings?.order_count ?? 0}{" "}
                                            orders
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {bdt(merchant.earnings?.total_sales)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                        <div className="text-red-600 font-medium">
                                            {"−"}
                                            {bdt(merchant.earnings?.commission)}
                                        </div>
                                        <div className="text-xs text-emerald-700">
                                            net {bdt(merchant.earnings?.net)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.merchant.details",
                                                        { id: merchant.id }
                                                    )}
                                                >
                                                    View Details
                                                </Link>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    commissionForm.reset();
                                                    commissionForm.clearErrors();
                                                    commissionForm.setData(
                                                        "rate",
                                                        String(
                                                            merchant.commission_rate ??
                                                                ""
                                                        )
                                                    );
                                                    setCommissionTarget(
                                                        merchant
                                                    );
                                                }}
                                                className="flex items-center gap-1"
                                            >
                                                <Percent className="w-4 h-4" />
                                                Set Commission
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    resetForm.reset();
                                                    resetForm.clearErrors();
                                                    setResetTarget(merchant);
                                                }}
                                                className="flex items-center gap-1"
                                            >
                                                <KeyRound className="w-4 h-4" />
                                                Reset Password
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" />{" "}
                                                        Take Over
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Take over this
                                                            merchant?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will remove the
                                                            merchant role from{" "}
                                                            <span className="font-semibold">
                                                                {merchant.name}
                                                            </span>{" "}
                                                            ({merchant.email})
                                                            and make them a
                                                            regular customer.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleTakeOver(
                                                                    merchant.id
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                                        >
                                                            Yes, take over
                                                        </AlertDialogAction>
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
            </div>

            {/* Add Merchant Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-green-600" />
                            Add New Merchant
                        </DialogTitle>
                        <DialogDescription>
                            Create a merchant account. They can log in with the
                            email and password you set here.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitAddMerchant} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                value={addForm.data.name}
                                onChange={(e) =>
                                    addForm.setData("name", e.target.value)
                                }
                                placeholder="Merchant name"
                            />
                            {addForm.errors.name && (
                                <p className="mt-1 text-xs text-red-600">
                                    {addForm.errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={addForm.data.email}
                                onChange={(e) =>
                                    addForm.setData("email", e.target.value)
                                }
                                placeholder="merchant@example.com"
                            />
                            {addForm.errors.email && (
                                <p className="mt-1 text-xs text-red-600">
                                    {addForm.errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Phone (optional)</Label>
                            <Input
                                type="text"
                                value={addForm.data.phone}
                                onChange={(e) =>
                                    addForm.setData("phone", e.target.value)
                                }
                                placeholder="01XXXXXXXXX"
                            />
                            {addForm.errors.phone && (
                                <p className="mt-1 text-xs text-red-600">
                                    {addForm.errors.phone}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Commission Rate (%)</Label>
                            <div className="relative">
                                <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className="pl-8"
                                    value={addForm.data.commission_rate}
                                    onChange={(e) =>
                                        addForm.setData(
                                            "commission_rate",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. 10"
                                />
                            </div>
                            {addForm.errors.commission_rate && (
                                <p className="mt-1 text-xs text-red-600">
                                    {addForm.errors.commission_rate}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={addForm.data.password}
                                onChange={(e) =>
                                    addForm.setData("password", e.target.value)
                                }
                                placeholder="••••••••"
                            />
                            {addForm.errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {addForm.errors.password}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                value={addForm.data.password_confirmation}
                                onChange={(e) =>
                                    addForm.setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAddOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={addForm.processing}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {addForm.processing
                                    ? "Creating..."
                                    : "Create Merchant"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Set Commission Dialog */}
            <Dialog
                open={!!commissionTarget}
                onOpenChange={(open) => !open && setCommissionTarget(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-emerald-600" />
                            Set Commission Rate
                        </DialogTitle>
                        <DialogDescription>
                            Set the commission percentage for{" "}
                            <span className="font-semibold">
                                {commissionTarget?.name}
                            </span>
                            . This is deducted from the merchant's sales.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitCommission} className="space-y-4">
                        <div>
                            <Label>Commission Rate (%)</Label>
                            <div className="relative">
                                <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className="pl-8"
                                    value={commissionForm.data.rate}
                                    onChange={(e) =>
                                        commissionForm.setData(
                                            "rate",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. 10"
                                />
                            </div>
                            {commissionForm.errors.rate && (
                                <p className="mt-1 text-xs text-red-600">
                                    {commissionForm.errors.rate}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCommissionTarget(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={commissionForm.processing}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                {commissionForm.processing
                                    ? "Saving..."
                                    : "Save Commission"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Reset Password Dialog */}
            <Dialog
                open={!!resetTarget}
                onOpenChange={(open) => !open && setResetTarget(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <KeyRound className="w-5 h-5 text-blue-600" />
                            Reset Merchant Password
                        </DialogTitle>
                        <DialogDescription>
                            Set a new password for{" "}
                            <span className="font-semibold">
                                {resetTarget?.name}
                            </span>{" "}
                            ({resetTarget?.email}).
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitResetPassword} className="space-y-4">
                        <div>
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                value={resetForm.data.password}
                                onChange={(e) =>
                                    resetForm.setData("password", e.target.value)
                                }
                                placeholder="••••••••"
                            />
                            {resetForm.errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {resetForm.errors.password}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Confirm New Password</Label>
                            <Input
                                type="password"
                                value={resetForm.data.password_confirmation}
                                onChange={(e) =>
                                    resetForm.setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                placeholder="••••••••"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setResetTarget(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={resetForm.processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {resetForm.processing
                                    ? "Saving..."
                                    : "Reset Password"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
