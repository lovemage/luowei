import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registrationSchema.parse(body);

    const registration = await prisma.registration.create({ data });

    // Send emails (non-blocking)
    const emailPromises: Promise<void>[] = [];

    if (data.email) {
      emailPromises.push(
        sendConfirmationEmail(data.email, data).catch((err) =>
          console.error("Failed to send confirmation email:", err)
        )
      );
    }

    const settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (settings?.adminEmail) {
      emailPromises.push(
        sendAdminNotificationEmail(settings.adminEmail, data).catch((err) =>
          console.error("Failed to send admin notification:", err)
        )
      );
    }

    Promise.all(emailPromises);

    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "驗證失敗" }, { status: 400 });
    }
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
