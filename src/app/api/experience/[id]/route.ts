import { NextResponse } from "next/server";

export const runtime = "edge";

type LetterRow = {
  id: string;
  data: string;
  created_at: number;
  expires_at: number;
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const env = process.env as any;
    const DB = env.DB;

    if (!DB) {
      return NextResponse.json(
        { ok: false, message: "D1 binding DB not found." },
        { status: 500 },
      );
    }

    const row = (await DB.prepare(`SELECT * FROM letters WHERE id = ? LIMIT 1`)
      .bind(id)
      .first()) as LetterRow | null;

    if (!row) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    if (Date.now() > row.expires_at) {
      return NextResponse.json({ ok: false, expired: true }, { status: 410 });
    }

    return NextResponse.json({
      ok: true,
      data: JSON.parse(row.data),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not load letter." },
      { status: 500 },
    );
  }
}
