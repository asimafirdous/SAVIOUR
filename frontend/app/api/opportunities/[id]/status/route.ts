import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = [
  "Applied",
  "OA Pending",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await req.json();
    const { status } = payload as { status?: string };
    if (
      typeof status !== "string" ||
      !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])
    ) {
      return NextResponse.json({
        error: "Invalid status"
      }, {
        status: 400
      });
    }

    const { id } = await params;
    const opportunity = await prisma.opportunity.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(opportunity);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to update status"
    }, {
      status: 500
    });
  }
}