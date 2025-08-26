"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
  type: "private" | "business";
  company: string;
  vat: string;
  address: string;
  quantity: string;
  material: string;
  hp: string; // honeypot
};

export default function ContactForm() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    type: "private",
    company: "",
    vat: "",
    address: "",
    quantity: "",
    material: "",
    hp: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData({ ...data, [key]: value });
  }

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
        onChange={(e) => update("name", e.target.value)}
        required
      />
      <input
        className="border rounded p-2"
        type="email"
        placeholder="E-mail"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
        required
      />
      <select
        className="border rounded p-2"
        value={data.type}
        onChange={(e) => update("type", e.target.value as FormData["type"])}
      >
        <option value="private">Particulier</option>
        <option value="business">Bedrijf</option>
      </select>
      {data.type === "business" ? (
        <>
          <input
            className="border rounded p-2"
            placeholder="Bedrijfsnaam"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            required
          />
          <input
            className="border rounded p-2"
            placeholder="BTW-nummer"
            value={data.vat}
            onChange={(e) => update("vat", e.target.value)}
          />
        </>
      ) : (
        <input
          className="border rounded p-2"
          placeholder="Adres"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
        />
      )}
      <input
        className="border rounded p-2"
        type="number"
        placeholder="Aantal"
        value={data.quantity}
        onChange={(e) => update("quantity", e.target.value)}
      />
      <input
        className="border rounded p-2"
        placeholder="Materiaal"
        value={data.material}
        onChange={(e) => update("material", e.target.value)}
      />
      <textarea
        className="border rounded p-2"
        placeholder="Bericht"
        rows={5}
        value={data.message}
        onChange={(e) => update("message", e.target.value)}
        required
      />
      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={data.hp}
        onChange={(e) => update("hp", e.target.value)}
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
