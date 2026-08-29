"use client";

import { useState } from "react";

const fields = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "site", label: "Site or city", type: "text" },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((field) => (
        <label key={field.name} className="group block">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist transition-colors group-focus-within:text-signal">
            {field.label}
          </span>
          <input
            required
            name={field.name}
            type={field.type}
            className="mt-3 w-full border-b border-line bg-transparent py-3 font-serif text-xl outline-none transition-colors focus:border-signal"
          />
        </label>
      ))}
      <label className="group block">
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-mist transition-colors group-focus-within:text-signal">
          The brief
        </span>
        <textarea
          required
          name="brief"
          rows={5}
          className="mt-3 w-full resize-none border-b border-line bg-transparent py-3 font-serif text-xl outline-none transition-colors focus:border-signal"
        />
      </label>
      <button
        type="submit"
        className="halo-btn rounded-full bg-signal px-8 py-4 font-mono text-[11px] tracking-[0.24em] uppercase text-ink"
        data-cursor="Send"
      >
        {sent ? "Received — we will write back" : "Send the brief"}
      </button>
    </form>
  );
}
