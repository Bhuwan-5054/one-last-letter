import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const recipientName = body?.recipientName || "you";

    const memories = [
      {
        title: "That late night call",
        description: `The one where talking to ${recipientName} felt easier than sleeping.`,
      },
      {
        title: "A small moment",
        description: "Something ordinary that somehow became special.",
      },
      {
        title: "The silence after the fight",
        description: "The moment I realized waiting was not fixing anything.",
      },
    ];

    return NextResponse.json({
      ok: true,
      memories,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not suggest memories.",
      },
      { status: 500 },
    );
  }
}
