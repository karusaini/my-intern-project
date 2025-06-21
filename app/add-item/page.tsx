"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/app/store/itemStore";
import { Card, CardContent } from "@/components/ui/card";

export default function AddItemPage() {
  const [success, setSuccess] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const addItem = useItemStore((state) => state.addItem);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = e.target["name"].value;
    const type = e.target["type"].value;
    const description = e.target["description"].value;

    if (!coverImage) {
      alert("Please upload a cover image.");
      return;
    }

    const newItem = {
      name,
      type,
      description,
      cover: URL.createObjectURL(coverImage),
      images: additionalImages.map((file) => URL.createObjectURL(file)),
    };

    addItem({
      id: crypto.randomUUID(), // generate unique ID
      ...newItem,
    });

    setSuccess(true);

    setTimeout(() => {
      router.push("/view-items");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-3xl font-bold text-center mb-6">Add New Item</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                required
                id="name"
                name="name"
                placeholder="Red Nike Shoes"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="type">Item Type</Label>
              <Input
                required
                id="type"
                name="type"
                placeholder="Shoes, Shirt, Pant..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                required
                id="description"
                name="description"
                placeholder="Describe your item..."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Cover Image</Label>
              <Input
                required
                type="file"
                accept="image/*"
                className="mt-1"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setCoverImage(file);
                }}
              />
            </div>

            <div>
              <Label>Additional Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                className="mt-1"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) setAdditionalImages(Array.from(files));
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-lg font-medium py-6 mt-4 cursor-pointer"
            >
              Add Item
            </Button>

            {success && (
              <p className="text-green-600 text-center mt-2">
                ✅ Item successfully added!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
