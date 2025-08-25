"use client";

import { useState } from "react";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input
        className="border rounded p-2"
        placeholder="Naam"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
      />
      <input
        className="border rounded p-2"
        type="email"
        placeholder="E-mail"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <textarea
        className="border rounded p-2"
        placeholder="Bericht"
        rows={5}
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded px-4 py-2 border"
      >
        {status === "loading" ? "Versturen..." : "Verstuur"}
      </button>
      {status === "ok" && <p className="text-green-600">Verzonden. Bedankt!</p>}
      {status === "error" && <p className="text-red-600">Er ging iets mis.</p>}
    </form>
  );
}
