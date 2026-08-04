import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.reminder.deleteMany({
        where: { userId: user.id },
      }),

      prisma.opportunity.deleteMany({
        where: { userId: user.id },
      }),

      prisma.email.deleteMany({
        where: { userId: user.id },
      }),

      prisma.user.update({
        where: { id: user.id },
        data: {
          lastSyncAt: null,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "All synced SAVIOUR data has been removed.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to reset synced data" },
      { status: 500 }
    );
  }
}