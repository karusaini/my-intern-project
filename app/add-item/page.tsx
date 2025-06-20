"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/app/store/itemStore";
import { Card, CardContent } from "@/components/ui/card";

// ✅ Helper function to convert image file to base64
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export default function AddItemPage() {
  const [success, setSuccess] = useState(false);
  const [coverImage, setCoverImage] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const addItem = useItemStore((state) => state.addItem);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
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
      cover: coverImage,
      images: additionalImages,
    };

    addItem(newItem);
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
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64 = await toBase64(file);
                    setCoverImage(base64);
                  }
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
                onChange={async (e) => {
                  const files = e.target.files;
                  if (files) {
                    const promises = Array.from(files).map((file) =>
                      toBase64(file)
                    );
                    const base64Images = await Promise.all(promises);
                    setAdditionalImages(base64Images);
                  }
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-lg font-medium py-6 mt-4"
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
