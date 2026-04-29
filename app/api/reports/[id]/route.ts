import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { service: true, staff: true },
    });
    if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(appointment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: Record<string, unknown> = {};
    if (body.customerName !== undefined) data.customerName = body.customerName;
    if (body.customerEmail !== undefined) data.customerEmail = body.customerEmail;
    if (body.startTime !== undefined) data.startTime = new Date(body.startTime);
    if (body.serviceId !== undefined) data.serviceId = body.serviceId;
    if (body.staffId !== undefined) data.staffId = body.staffId;
    if (body.status !== undefined) data.status = body.status;

    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: { service: true, staff: true },
    });
    return NextResponse.json(appointment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.appointment.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}