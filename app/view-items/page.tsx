"use client";

import { useItemStore } from "@/app/store/itemStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { ItemDetailModal } from "@/components/ItemDetailModal";
import { EditItemModal } from "@/components/EditItemModal";
import { Button } from "@/components/ui/button";

export default function ViewItemsPage() {
  const { items, deleteItem } = useItemStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">View Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card
            key={item.id || idx}
            className="hover:shadow-md transition relative flex flex-col"
          >
            <Image
              src={item.cover}
              alt={item.name}
              width={400}
              height={250}
              className="rounded-t-lg object-cover h-48 w-full"
            />

            <CardContent className="p-4 flex-1">
              <CardTitle>{item.name}</CardTitle>
            </CardContent>

            <div className="flex justify-between px-4 pb-4 gap-2 ">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setSelectedItem(item)}
              >
                View
              </Button>
              <Button
                className="cursor-pointer"
                variant="default"
                onClick={() => setEditItem(item)}
              >
                Edit
              </Button>
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {editItem && (
        <EditItemModal item={editItem} onClose={() => setEditItem(null)} />
      )}
    </div>
  );
}
