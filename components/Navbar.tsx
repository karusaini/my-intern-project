"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b p-4 px-6 flex justify-between items-center bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-black">
        GearNest
      </Link>
      <nav className="space-x-6 text-sm font-medium">
        <Link href="/add-item" className="hover:text-blue-500">
          Add Item
        </Link>
        <Link href="/view-items" className="hover:text-blue-500">
          View Items
        </Link>
      </nav>
    </header>
  );
}
