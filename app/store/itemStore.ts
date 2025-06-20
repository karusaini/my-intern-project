// store/itemStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Item {
  name: string;
  type: string;
  description: string;
  cover: string;
  images: string[];
}

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
    }),
    {
      name: "gear-items-storage",
    }
  )
);
