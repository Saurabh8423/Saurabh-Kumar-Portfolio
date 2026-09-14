/**
 * Checks that EMAIL_USER / EMAIL_PASS can actually authenticate with Gmail,
 * without going through the contact form.
 *
 *   npm run verify:email          # auth check only
 *   npm run verify:email -- --send   # also send a real test message to yourself
 */

import { readFileSync, existsSync } from "node:fs";
import nodemailer from "nodemailer";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";

const ok = (m) => console.log(`${GREEN}✓${RESET} ${m}`);
const bad = (m) => console.log(`${RED}✗${RESET} ${m}`);
const note = (m) => console.log(`${DIM}  ${m}${RESET}`);

/** Minimal .env parser — avoids adding dotenv just for this script. */
function loadEnvFile() {
  const file = [".env.local", ".env"].find((f) => existsSync(f));
  if (!file) return null;

  for (const raw of readFileSync(file, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
  return file;
}

const envFile = loadEnvFile();
console.log(`\nContact-form email check\n${"─".repeat(40)}`);

if (envFile) ok(`loaded ${envFile}`);
else bad("no .env.local or .env found");

const { EMAIL_USER, EMAIL_PASS } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  bad("EMAIL_USER / EMAIL_PASS are not set");
  note("cp .env.example .env.local, then fill both values.");
  note("EMAIL_PASS must be a Gmail App Password, not your account password:");
  note("https://myaccount.google.com/apppasswords  (needs 2FA enabled)");
  process.exit(1);
}

ok(`EMAIL_USER = ${EMAIL_USER}`);

// Gmail App Passwords are 16 characters; the UI shows them in 4 groups of 4.
const pass = EMAIL_PASS.replace(/\s/g, "");
if (pass.length !== 16) {
  console.log(
    `${YELLOW}!${RESET} EMAIL_PASS is ${pass.length} characters — a Gmail App Password is 16.`
  );
  note("If you pasted your normal account password, Gmail will reject it.");
} else {
  ok("EMAIL_PASS looks like a 16-character App Password");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

try {
  await transporter.verify();
  ok("authenticated with Gmail SMTP");
} catch (error) {
  bad(`Gmail rejected the connection: ${error.message.split("\n")[0]}`);
  if (error.code === "EAUTH") {
    note("EAUTH = wrong username or password.");
    note("Use an App Password (16 chars), not your Google account password.");
  } else if (error.code === "ESOCKET" || error.code === "ECONNECTION") {
    note("Network or firewall is blocking outbound SMTP on port 465/587.");
  }
  process.exit(1);
}

if (process.argv.includes("--send")) {
  const stamp = new Date().toISOString();
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio contact" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: "Portfolio contact form — test",
      text: `This is a test sent by scripts/verify-email.mjs at ${stamp}.`,
    });
    ok(`test email sent (id ${info.messageId})`);
    note(`check the inbox of ${EMAIL_USER}`);
  } catch (error) {
    bad(`send failed: ${error.message.split("\n")[0]}`);
    process.exit(1);
  }
} else {
  note("credentials are valid — re-run with `-- --send` to send a test email.");
}

console.log();
