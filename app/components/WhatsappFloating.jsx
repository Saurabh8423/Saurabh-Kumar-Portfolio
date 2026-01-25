"use client";

import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappFloating.css";

export default function WhatsappFloating() {
  const phoneNumber = "918423626340"; // India +91
  const message = "Hello, I want to Connect with You";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
