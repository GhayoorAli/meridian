"use client";

import { useState } from "react";
import { ArrowDownRight, Roll } from "@/components/ui";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "site", label: "Site or city", type: "text" },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-10"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-[18px]">{field.label}</span>
          <input
            required
            name={field.name}
            type={field.type}
            className="mt-2 w-full border-b border-line bg-transparent py-2 text-[20px] outline-none transition-colors focus:border-ink"
          />
        </label>
      ))}
      <label className="block">
        <span className="text-[18px]">The brief</span>
        <textarea
          required
          name="brief"
          rows={4}
          className="mt-2 w-full resize-none border-b border-line bg-transparent py-2 text-[20px] outline-none transition-colors focus:border-ink"
        />
      </label>
      <button type="submit" className="roll-host inline-flex items-center gap-2 text-[20px]">
        <Roll>
          {sent ? "Received — we will write back" : "Send"}
          <ArrowDownRight />
        </Roll>
      </button>
    </form>
  );
}
