import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, UserPlus } from "lucide-react";

export default function UserList({ users }) {
  const { post, processing } = useForm();

  const assignMerchantRole = (userId) => {
    post(route("admin.assign-merchant", { id: userId }), {
      onSuccess: () => toast({ title: "Success", description: "User is now a merchant!" }),
      onError: () => toast({ title: "Error", description: "Failed to assign role.", variant: "destructive" }),
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-500" />
          All Customers
        </h2>

        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-16 text-center">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="text-center">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      Customer
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="default"
                      size="sm"
                      disabled={processing}
                      onClick={() => assignMerchantRole(user.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Make Merchant
                    </Button>
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
