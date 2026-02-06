import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/utils";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("dash-auth")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Missing token or team_id" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const res = await fetch(api.createProject(), {
    method: "POST",
    headers: {
      "x-api-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data.error || []);
  }

  return NextResponse.json(data || []);
}
