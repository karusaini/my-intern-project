// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-white">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-black">
          Welcome to GearNest
        </h1>

        {/* Paragraph */}
        <p className="text-lg text-muted-foreground">
          Your personalized space to add, explore, and manage fashion & gear
          items beautifully.
        </p>

        {/* Image */}
        <div>
          <img
            src="/landing.png"
            alt="Hero"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Button */}
        <Link href="/add-item">
          <Button size="lg" className="mt-4 cursor-pointer">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
