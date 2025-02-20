import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

export default function MerchantApplications({ stores }) {
    const { toast } = useToast();
  const { post, processing } = useForm(); // Using useForm for actions

  const handleApprove = (storeId) => {
    post(route("merchant.applications.approve", { store: storeId }), {
      preserveScroll: true,
      onSuccess: () => {
        toast({ title: "Approved", description: "Merchant application approved successfully." });
      },
    });
  };
  
  const handleReject = (storeId) => {
    post(route("merchant.applications.reject", { store: storeId }), {
      preserveScroll: true,
      onSuccess: () => {
        toast({ title: "Rejected", description: "Merchant application rejected successfully." });
      },
    });
  };
  

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Merchant Applications</h1>
        {stores.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-600">No pending applications.</CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-lg border shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Store Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Contact Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.user?.name}</TableCell>
                    <TableCell>{store.application_status}</TableCell>
                    <TableCell>{store.contact_email}</TableCell>
                    <TableCell>{store.contact_phone}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="success"
                        onClick={() => handleApprove(store.id)}
                        disabled={processing}
                      >
                        {processing ? "Approving..." : "Approve"}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(store.id)}
                        disabled={processing}
                      >
                        {processing ? "Rejecting..." : "Reject"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
