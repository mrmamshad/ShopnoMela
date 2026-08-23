import { useForm, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Search } from "lucide-react";
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
import { Trash2 } from "lucide-react"; // Icon
import { toast } from "@/hooks/use-toast";

export default function MerchantList({ merchants, filters = {} }) {
    const { post } = useForm();
    const [search, setSearch] = useState(filters.q || "");

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
                    variant: "destructive", // This makes it look dangerous
                });
            },
        });
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <h2 className="text-3xl font-semibold mb-6">
                    🛍️ All Merchants
                </h2>

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
                                    Role
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
                                        colSpan={5}
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
                                        <Badge variant="outline">
                                            Merchant
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={route("admin.merchant.details", { id: merchant.id })}
                                                >
                                                    View Details
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleTakeOver(merchant.id)
                                                }
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />{" "}
                                                Take Over
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}
