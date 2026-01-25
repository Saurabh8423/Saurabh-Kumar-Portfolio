"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="w-full px-[12%] py-24 bg-gradient-to-b from-[#020617] via-[#020617] to-[#0f172a] scroll-mt-20"
    >
      <h4 className="text-center text-gray-400 font-Ovo mb-2">
        Connect with me
      </h4>

      <h2 className="text-center text-3xl md:text-4xl font-Ovo font-semibold mb-12 text-white">
        Let’s build something great
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto glass rounded-3xl p-10 flex flex-col gap-6 card-glow transition-all duration-500"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="input-glow bg-transparent border border-white/20 rounded-lg px-5 py-3 text-white placeholder-gray-400 outline-none transition"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Your Email"
            className="input-glow bg-transparent border border-white/20 rounded-lg px-5 py-3 text-white placeholder-gray-400 outline-none transition"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="6"
          placeholder="Tell me about your project..."
          className="input-glow bg-transparent border border-white/20 rounded-lg px-5 py-3 text-white placeholder-gray-400 outline-none resize-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="self-center px-10 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-xl glow-hover"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-center mt-3">
            Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-center mt-3">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </section>
  );
}
