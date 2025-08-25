// /app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = payload as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!data?.name || !data?.email || !data?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 422 });
  }

  // TODO: stuur mail, sla op, whatever
  // await sendMail(data)

  return NextResponse.json({ ok: true });
}
