import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const account = await prisma.account.findFirst({
    where: {
      user: {
        email: session.user.email,
      },
      provider: "google",
    },
  });

  console.log("ACCOUNT:", account);

  if (!account) {
    return NextResponse.json(
      { error: "Google account not connected" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    accessToken: !!account.access_token,
    refreshToken: !!account.refresh_token,
    scope: account.scope,
  });
}