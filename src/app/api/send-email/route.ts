import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, totalPrice, coupon } = await req.json();

    if (!email || !totalPrice || !coupon) {
      return NextResponse.json({ error: "Missing email parameters" }, { status: 400 });
    }

    const msg = {
      to: email,
      from: "firaolbekele30@gmail.com", // Replace with your verified sender email
      subject: "Tour Booking Confirmation",
      text: `Your payment has been approved!\nTotal Price: $${totalPrice}\nCoupon Code: ${coupon}`,
      html: `<h1>Payment Approved!</h1>
             <p><strong>Total Price:</strong> $${totalPrice}</p>
             <p><strong>Coupon Code:</strong> ${coupon}</p>
             <p>Enjoy your trip!</p>`,
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
