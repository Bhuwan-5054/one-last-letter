import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tone = body?.tone || "honest";
    const recipientName = body?.recipientName || "you";
    const senderName = body?.senderName || "me";

    const letter = `Dear ${recipientName},

I know things have not been easy between us.

I do not want this letter to feel like pressure. I only wanted to say what I could not say properly before.

I am sorry for the misunderstanding, for the silence, and for the distance that grew between us.

Whatever happens next, I want you to know that what we had mattered to me.

— ${senderName}`;

    return NextResponse.json({
      ok: true,
      letter,
      tone,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not draft letter.",
      },
      { status: 500 },
    );
  }
}
