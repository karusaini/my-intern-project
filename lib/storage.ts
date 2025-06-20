export function getItems() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("items");
  return data ? JSON.parse(data) : [];
}

export function saveItem(item: any) {
  const items = getItems();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}
