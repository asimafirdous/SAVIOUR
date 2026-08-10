import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();

    const opportunity = await prisma.opportunity.create({
      data: {
        userId: user.id,
        title: body.title,
        company: body.company || "Unknown",
        status: "Applied",
        sourceEmail: body.subject || null,
      },
    });

    return NextResponse.json({ success: true, opportunity });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add to SaveLine" },
      { status: 500 }
    );
  }
}