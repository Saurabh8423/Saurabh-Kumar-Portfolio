import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple per-instance throttle. Resets on redeploy/cold start — enough to blunt
// casual spam without adding infrastructure.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs
  );

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body, status) {
  return Response.json(body, { status });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return json({ success: false, message: "Invalid request." }, 400);

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const honeypot = String(body.company ?? "").trim();

    // Bots fill the hidden field; accept silently so they don't retry.
    if (honeypot) return json({ success: true, message: "Message sent." }, 200);

    if (!name || !email || !message) {
      return json({ success: false, message: "All fields are required." }, 400);
    }

    if (!EMAIL_RE.test(email) || email.length > 200) {
      return json(
        { success: false, message: "Please enter a valid email address." },
        400
      );
    }

    if (name.length > 100 || message.length > 4000) {
      return json({ success: false, message: "That message is too long." }, 400);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return json(
        { success: false, message: "Too many messages. Try again later." },
        429
      );
    }

    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("contact: EMAIL_USER / EMAIL_PASS are not configured");
      return json(
        { success: false, message: "Email is not configured on the server." },
        500
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      // Gmail rejects a spoofed From, so send as yourself and reply to the visitor.
      from: `"Portfolio contact" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>New portfolio message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return json({ success: true, message: "Message sent successfully." }, 200);
  } catch (error) {
    console.error("contact route failed:", error);
    return json(
      { success: false, message: "Something went wrong. Please try again." },
      500
    );
  }
}
