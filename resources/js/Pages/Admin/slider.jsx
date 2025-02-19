import DashboardLayout from "@/Layouts/admin-dashboard-layout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
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

export default function Slider() {
  const { offers } = usePage().props;
  const { data, setData, post, processing, reset } = useForm({
    title: "",
    image: "",
    discount: "",
    valid_until: "",
  });

  const [editData, setEditData] = useState(null);
  const editForm = useForm(editData || { title: "", image: "", discount: "", valid_until: "" });
  const { toast } = useToast(); 

  // Add Offer
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("offers.store"), {
      onSuccess: () => {
        reset();
        toast({ title: "Success", description: "Offer added successfully!", variant: "default" });
      },
    });
  };

  // Update Offer
  const handleEditSubmit = (e) => {
    e.preventDefault();
    editForm.put(route("offers.update", { offer: editData.id }), {
      onSuccess: () => {
        setEditData(null);
        toast({ title: "Success", description: "Offer updated successfully!", variant: "default" });
      },
    });
  };

  // Delete Offer
  const handleDelete = (id) => {
    editForm.delete(route("offers.destroy", { offer: id }), {
      onSuccess: () => toast({ title: "Deleted", description: "Offer deleted successfully!", variant: "destructive" }),
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Offers</h1>

      {/* Mobile Responsive Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.title}</TableCell>
                <TableCell>
                  <img src={offer.image} alt={offer.title} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell>{offer.discount}%</TableCell>
                <TableCell>{offer.valid_until}</TableCell>
                <TableCell className="flex gap-2">
                  
                  {/* Edit Dialog */}
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
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            type="text"
                            value={editForm.data.image}
                            onChange={(e) => editForm.setData("image", e.target.value)}
                            required
                          />
                        </div>
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

                  {/* Delete Confirmation Dialog */}
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
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDelete(offer.id)}
                        >
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
          <div>
            <Label>Image URL</Label>
            <Input type="text" value={data.image} onChange={(e) => setData("image", e.target.value)} required />
          </div>
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
