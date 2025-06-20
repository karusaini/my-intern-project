// components/ItemDetailModal.tsx
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import emailjs from "emailjs-com";

export function ItemDetailModal({ item, onClose }: any) {
  const handleEnquire = () => {
    emailjs
      .send(
        "service_5aqjntg", // ✅ Replace this
        "template_v7c026c", // ✅ Replace this
        {
          item_name: item.name,
          item_type: item.type,
        },
        "xMXXAB6Gc1GWTKiOo" // ✅ Replace this
      )
      .then(
        () => {
          alert("Email sent successfully!");
        },
        (error) => {
          console.error(error);
          alert("Email failed to send.");
        }
      );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xl space-y-4">
        <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>

        <p className="text-sm text-muted-foreground">{item.type}</p>
        <p>{item.description}</p>

        <div className="flex gap-2 overflow-x-auto">
          {item.images.map((img: string, idx: number) => (
            <Image
              key={idx}
              src={img}
              alt={`Image ${idx + 1}`}
              width={150}
              height={100}
              className="rounded-lg object-cover"
            />
          ))}
        </div>

        <Button className="w-full mt-4 cursor-pointer" onClick={handleEnquire}>
          Enquire
        </Button>
      </DialogContent>
    </Dialog>
  );
}
