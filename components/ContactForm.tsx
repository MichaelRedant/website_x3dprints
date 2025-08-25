// components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setOk(res.ok);
      if (res.ok) setData({ name: "", email: "", message: "" });
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input
        className="border rounded p-3"
        placeholder="Naam"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
      />
      <input
        className="border rounded p-3"
        placeholder="E-mail"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <textarea
        className="border rounded p-3 min-h-40"
        placeholder="Bericht"
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black text-white px-5 py-3 disabled:opacity-50"
      >
        {loading ? "Versturen..." : "Verstuur"}
      </button>
      {ok === true && <p className="text-green-600">Verzonden. We nemen snel contact op.</p>}
      {ok === false && <p className="text-red-600">Er ging iets mis. Probeer opnieuw.</p>}
    </form>
  );
}
