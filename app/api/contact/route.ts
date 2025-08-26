import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import path from "node:path";

interface FormData {
  name: string;
  email: string;
  message: string;
  type: "private" | "business";
  company?: string;
  vat?: string;
  address?: string;
  quantity?: string;
  material?: string;
  hp?: string;
}

function isEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = payload as FormData;

  if (data.hp) {
    // honeypot triggered
    return NextResponse.json({ ok: true });
  }

  if (!data.name || !isEmail(data.email) || !data.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 422 });
  }

  try {
    await sendWithPhpMailer(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}

function sendWithPhpMailer(data: FormData) {
  const script = path.join(process.cwd(), "php", "mail.php");
  return new Promise<void>((resolve, reject) => {
    const child = spawn("php", [script]);
    child.stdin.write(JSON.stringify(data));
    child.stdin.end();
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("php failed"));
      }
    });
    child.on("error", reject);
  });
}
