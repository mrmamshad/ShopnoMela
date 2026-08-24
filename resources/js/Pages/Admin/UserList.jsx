import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { Trash2, UserPlus } from "lucide-react";
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

export default function UserList({ users }) {
  const { delete: destroy, processing } = useForm();

  const deleteUser = (userId) => {
    destroy(route("admin.users.delete", { id: userId }), {
      preserveScroll: true,
      onSuccess: () =>
        toast({ title: "Deleted", description: "User has been deleted." }),
      onError: () =>
        toast({
          title: "Error",
          description: "Failed to delete user.",
          variant: "destructive",
        }),
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={processing}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this user?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete{" "}
                            <span className="font-semibold">{user.name}</span> (
                            {user.email}). This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                          >
                            Yes, delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
