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

  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get("project_id") || "0";

  const res = await fetch(api.deleteProject(project_id), {
    method: "POST",
    headers: {
      "x-api-token": `${token}`,
      "Content-Type": "application/json",
    }
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data.error || []);
  }

  return NextResponse.json(data || []);
}
