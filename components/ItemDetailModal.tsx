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
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ItemDetailModal({ item, onClose }: any) {
  const [sliderRef] = useKeenSlider({ loop: true });
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // form refs
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleEnquire = () => {
    const userName = nameRef.current?.value;
    const userEmail = emailRef.current?.value;
    const userMessage = messageRef.current?.value;

    if (!userName || !userEmail) {
      alert("Please fill your name and email.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_5aqjntg",
        "template_v7c026c",
        {
          item_name: item.name,
          item_type: item.type,
          user_name: userName,
          user_email: userEmail,
          user_message: userMessage,
        },
        "xMXXAB6Gc1GWTKiOo"
      )
      .then(() => {
        setEmailSent(true);
        setLoading(false);
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
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
        <DialogTitle className="text-2xl sm:text-3xl font-bold text-center ">
          {item.name}
        </DialogTitle>

        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">{item.type}</p>
          <p className="text-base text-gray-700">{item.description}</p>
        </div>

        {/* ✅ Carousel */}
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

        {/* ✅ Enquiry Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              ref={nameRef}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="john@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              ref={messageRef}
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
