import { NextRequest, NextResponse } from "next/server";
import { validateWaitlistSubmission } from "@/lib/validation";
import { insertWaitlistEntry } from "@/lib/supabase-server";
import { sendWaitlistConfirmationEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export type WaitlistResponse =
  | { status: "success" }
  | { status: "duplicate" }
  | { status: "invalid" }
  | { status: "error" };

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json<WaitlistResponse>({ status: "error" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<WaitlistResponse>({ status: "invalid" }, { status: 400 });
  }

  const result = validateWaitlistSubmission(body);

  if (!result.ok) {
    if (result.reason === "honeypot") {
      // Don't tip off automated submissions — respond as if it succeeded.
      return NextResponse.json<WaitlistResponse>({ status: "success" });
    }
    return NextResponse.json<WaitlistResponse>({ status: "invalid" }, { status: 400 });
  }

  try {
    const insertResult = await insertWaitlistEntry({
      ...result.data,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (insertResult === "duplicate") {
      return NextResponse.json<WaitlistResponse>({ status: "duplicate" });
    }

    sendWaitlistConfirmationEmail(result.data.email).catch((error) => {
      console.error("[waitlist] confirmation email failed", error);
    });

    return NextResponse.json<WaitlistResponse>({ status: "success" });
  } catch (error) {
    console.error("[waitlist] insert failed", error);
    return NextResponse.json<WaitlistResponse>({ status: "error" }, { status: 500 });
  }
}
