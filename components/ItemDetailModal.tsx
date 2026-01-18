"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import emailjs from "emailjs-com";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ItemDetailModal({ item, onClose }: any) {
  const [sliderRef] = useKeenSlider({ loop: true });
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Controlled input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEnquire = () => {
    if (!name || !email) {
      alert("Please fill your name and email.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_4lwemsd",
        "template_7jez249",
        {
          item_name: item.name,
          item_type: item.type,
          user_name: name,
          user_email: email,
          user_message: message,
        },
        "YSQsreO5dIiA5WVH8",
      )
      .then(() => {
        setEmailSent(true);
        setLoading(false);
        // reset fields
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setEmailSent(false), 3000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("Email failed to send.");
      });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl px-4 sm:px-6 py-6 space-y-5">
        <DialogTitle className="text-2xl sm:text-3xl font-bold text-center">
          {item.name}
        </DialogTitle>

        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">{item.type}</p>
          <p className="text-base text-gray-700">{item.description}</p>
        </div>

        {/* Image slider */}
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {item.images.map((img: string, idx: number) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center items-center"
            >
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                width={400}
                height={280}
                className="rounded-md object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Enquiry form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'm interested in this item."
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleEnquire}
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Enquiry"}
          </Button>

          {emailSent && (
            <p className="text-green-600 text-sm text-center">
              ✅ Email sent successfully!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
