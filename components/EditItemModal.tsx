"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useItemStore } from "@/app/store/itemStore";

export function EditItemModal({ item, onClose }: any) {
  const { updateItem } = useItemStore();

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateItem(formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4">
        <DialogTitle>Edit Item</DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
          />
          <Input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Item Type"
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Item Description"
          />
          <Input
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            placeholder="Cover Image URL"
          />
          <Input
            name="images"
            value={formData.images.join(",")}
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.value.split(",") })
            }
            placeholder="Additional Images (comma separated URLs)"
          />
          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
