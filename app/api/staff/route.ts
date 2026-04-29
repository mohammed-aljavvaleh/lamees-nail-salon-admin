import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(staff);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, role } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const member = await prisma.staff.create({
      data: { name, role: role || "Technician" },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}