import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const recipientName = body?.recipientName || "you";

    const messages = [
      `Reached home?`,
      `Good night.`,
      `Call me when free.`,
      `Don't skip dinner.`,
      `Take care.`,
      `Text me once, ${recipientName}.`,
    ];

    return NextResponse.json({
      ok: true,
      messages,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not suggest messages.",
      },
      { status: 500 },
    );
  }
}
