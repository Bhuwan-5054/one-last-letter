import { NextResponse } from "next/server";

export const runtime = "edge";

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const env = process.env as any;
    const DB = env.DB;

    if (!DB) {
      return NextResponse.json(
        { ok: false, message: "D1 binding DB not found." },
        { status: 500 },
      );
    }

    const id = createId();
    const createdAt = Date.now();
    const expiresAt = createdAt + 7 * 24 * 60 * 60 * 1000;

    await DB.prepare(
      `INSERT INTO letters (id, data, created_at, expires_at)
       VALUES (?, ?, ?, ?)`,
    )
      .bind(id, JSON.stringify({ ...body, expiresAt }), createdAt, expiresAt)
      .run();

    const url = new URL(request.url);

    return NextResponse.json({
      ok: true,
      id,
      url: `${url.origin}/e/${id}`,
      expiresAt,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Publish failed." },
      { status: 500 },
    );
  }
}
