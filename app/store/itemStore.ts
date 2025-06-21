import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Item {
  id: string; // 🔑 unique ID needed
  name: string;
  type: string;
  description: string;
  cover: string;
  images: string[];
}

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }],
        })),
      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "gear-items-storage",
    }
  )
);
