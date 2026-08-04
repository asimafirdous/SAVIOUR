import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    // Fire-and-forget background sync
    fetch("http://localhost:3000/api/sync/gmail",
        {
            method: "POST",
            headers: { cookie: cookieHeader },
        }).catch(console.error);
    return NextResponse.json({
        success: true,
        message: "Background sync started",
    });
}