"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contacto", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" },
    });

    const data = (await response.json()) as { message?: string };
    setState(response.ok ? "success" : "error");
    setMessage(data.message ?? "No se pudo enviar el mensaje.");

    if (response.ok) form.reset();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <Field label="Nombre" name="name" required />
      <Field label="Email" name="email" required type="email" />
      <Field label="Asunto" name="subject" required />
      <label className="block">
        <span className="text-sm uppercase text-muted dark:text-stone-400">Mensaje</span>
        <textarea
          className="mt-2 min-h-40 w-full border border-line bg-transparent px-4 py-3 text-ink outline-none transition focus:border-accent dark:border-white/10 dark:text-paper dark:focus:border-brass"
          name="message"
          required
        />
      </label>
      <button
        className="border border-accent px-5 py-3 text-sm uppercase text-accent transition hover:bg-accent hover:text-paper disabled:cursor-not-allowed disabled:opacity-60 dark:border-brass dark:text-brass dark:hover:bg-brass dark:hover:text-night"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? "Enviando" : "Enviar mensaje"}
      </button>
      {message && (
        <p className={state === "success" ? "text-accent dark:text-brass" : "text-red-700 dark:text-red-300"}>
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm uppercase text-muted dark:text-stone-400">{label}</span>
      <input
        className="mt-2 w-full border border-line bg-transparent px-4 py-3 text-ink outline-none transition focus:border-accent dark:border-white/10 dark:text-paper dark:focus:border-brass"
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}
