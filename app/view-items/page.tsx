// app/view-items/page.tsx
"use client";

import { useItemStore } from "@/app/store/itemStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { ItemDetailModal } from "@/components/ItemDetailModal";

export default function ViewItemsPage() {
  const items = useItemStore((state) => state.items);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">View Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="hover:shadow-md cursor-pointer transition"
          >
            <Image
              src={item.cover}
              alt={item.name}
              width={400}
              height={250}
              className="rounded-t-lg object-cover h-48 w-full"
            />
            <CardContent className="p-4">
              <CardTitle>{item.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
