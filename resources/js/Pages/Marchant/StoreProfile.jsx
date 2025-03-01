import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/marchant-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function StoreProfile({ store, user }) {
  console.log("store", store);
  const { toast } = useToast();
  const { flash } = usePage().props;

  // Show success message via toast if available
  useEffect(() => {
    if (flash.success) {
      toast({
        title: "Success",
        description: flash.success,
      });
    }
    if (flash.error) {
      toast({
        title: "Error",
        description: flash.error,
        variant: "destructive",
      });
    }
  }, [flash, toast]);

  const { data, setData, post, processing, errors } = useForm({
    name: store?.name || "",
    cover_photo: null,
    profile_photo: null,
    description: store?.description || "",
    contact_email: store?.contact_email || user.email || "",
    contact_phone: store?.contact_phone || "",
    facebook: store?.facebook || "",
    instagram: store?.instagram || "",
    twitter: store?.twitter || "",
  });

  const handleFileChange = (field, e) => {
    setData(field, e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("merchant.store.update"), {
      forceFormData: true,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Store Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Display Cover Photo */}
            {store?.cover_photo && (
              <div className="mb-4">
                <Label>Current Cover Photo</Label>
                <img
                  src={`/storage/${store.cover_photo}`}
                  alt="Cover"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
{/* storage/app/public/stores/profile_photos/eKb0iKhlgV4G0XR36lIZqRyDavIAlQkyZyoKIvU8.png */}
            {/* Display Profile Photo */}
            {store?.profile_photo && (
              <div className="mb-4">
                <Label>Current Profile Photo</Label>
                <img
                  src={`/storage/${store.profile_photo}`}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Store Name</Label>
                <Input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Store Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <Label>Cover Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("cover_photo", e)}
                />
                {errors.cover_photo && (
                  <p className="text-red-500 text-sm">{errors.cover_photo}</p>
                )}
              </div>

              <div>
                <Label>Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("profile_photo", e)}
                />
                {errors.profile_photo && (
                  <p className="text-red-500 text-sm">
                    {errors.profile_photo}
                  </p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  placeholder="Short store description..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={data.contact_email}
                  onChange={(e) => setData("contact_email", e.target.value)}
                  placeholder="Contact Email"
                />
                {errors.contact_email && (
                  <p className="text-red-500 text-sm">
                    {errors.contact_email}
                  </p>
                )}
              </div>

              <div>
                <Label>Contact Phone</Label>
                <Input
                  type="text"
                  value={data.contact_phone}
                  onChange={(e) => setData("contact_phone", e.target.value)}
                  placeholder="+1234567890"
                />
                {errors.contact_phone && (
                  <p className="text-red-500 text-sm">
                    {errors.contact_phone}
                  </p>
                )}
              </div>

              <div>
                <Label>Facebook</Label>
                <Input
                  type="text"
                  value={data.facebook}
                  onChange={(e) => setData("facebook", e.target.value)}
                  placeholder="Facebook URL"
                />
                {errors.facebook && (
                  <p className="text-red-500 text-sm">{errors.facebook}</p>
                )}
              </div>

              <div>
                <Label>Instagram</Label>
                <Input
                  type="text"
                  value={data.instagram}
                  onChange={(e) => setData("instagram", e.target.value)}
                  placeholder="Instagram URL"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-sm">{errors.instagram}</p>
                )}
              </div>

              <div>
                <Label>Twitter</Label>
                <Input
                  type="text"
                  value={data.twitter}
                  onChange={(e) => setData("twitter", e.target.value)}
                  placeholder="Twitter URL"
                />
                {errors.twitter && (
                  <p className="text-red-500 text-sm">{errors.twitter}</p>
                )}
              </div>

              <Button type="submit" disabled={processing}>
                {processing ? "Updating..." : "Update Store"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
