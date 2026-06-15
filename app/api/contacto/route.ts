import { NextResponse } from "next/server";

const requiredFields = ["name", "email", "subject", "message"];

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const missing = requiredFields.some((field) => {
    const value = body[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing) {
    return NextResponse.json({ message: "Completá todos los campos para enviar el mensaje." }, { status: 400 });
  }

  if (!process.env.CONTACT_PROVIDER || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { message: "El formulario todavía no tiene configurado un proveedor de envío." },
      { status: 501 },
    );
  }

  return NextResponse.json(
    { message: "Proveedor de contacto configurado, pero falta conectar la implementación de envío." },
    { status: 501 },
  );
}
