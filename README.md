# Saurabh Kumar - Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4
and GSAP.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Gmail credentials
npm run dev
```

Open http://localhost:3000.

## Environment variables

The contact form at `app/api/contact/route.js` sends mail through Gmail via
nodemailer. Both variables are required - without them the API responds with
`Email is not configured on the server.`

| Variable     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `EMAIL_USER` | Gmail address that receives submissions                               |
| `EMAIL_PASS` | Gmail **App Password** (needs 2FA) - not your normal account password |

Set the same two variables in your host's dashboard when deploying.

### Verifying email works

```bash
npm run verify:email             # authenticate against Gmail, no email sent
npm run verify:email -- --send   # also send a test message to yourself
```

This talks to Gmail SMTP directly, so it tells you whether the credentials are
the problem without going through the form. Common failures:

| Symptom                                        | Cause                                               |
| ---------------------------------------------- | --------------------------------------------------- |
| `EMAIL_USER / EMAIL_PASS are not set`          | no `.env.local`                                      |
| `EAUTH` / `Invalid login: 535-5.7.8`           | using the account password, not an App Password      |
| `534-5.7.9 Please log in with your web browser`| same - Gmail wants an App Password                   |
| `ESOCKET` / `ECONNECTION`                      | firewall blocking outbound SMTP (465/587)            |

The API deliberately returns a generic "Something went wrong" to the browser on
send failure so SMTP details are never exposed to visitors - the real error is
logged server-side as `contact route failed: …`.

## Structure

```
app/
  api/contact/route.js     contact endpoint (validation, honeypot, rate limit)
  components/              section components
    TiltCard.jsx           3D tilt wrapper around .card
    data/                  projects, experience and skills content
  hooks/
    useDarkMode.js         .dark class toggle, dark by default
    useReveal.js           GSAP ScrollTrigger reveal for [data-reveal] children
    useTilt.js             cursor-tracking 3D tilt
  globals.css              design tokens, dark variant, component classes
  layout.js                fonts, metadata, no-flash theme script
assets/                    imported images (logos, icons, portraits)
public/                    static files served at the root (/projects, /design)
```

## Theming

Midnight and violet theme with a warm gold accent, plus a light mode. Every page load starts in dark mode; light mode is available through the toggle. Design tokens live in `app/globals.css`.
Cards use subtle borders, hover tilt and scroll reveals. The hero has restrained
radial lighting; project cards display screenshots from `public/projects`.
Animations respect reduced-motion preferences and tilt is disabled on touch.

## Content

Experience and projects are maintained in `app/components/data`. Services include
web development, AI/ML, React Native and Capacitor mobile development, and SEO.
The download link serves `public/Saurabh-Kumar.pdf`.

## Production build

```bash
npm run build
npm start
```

Set contact email environment variables in the deployment environment. Local
`.env.local` belongs at the repository root, not inside `app/`.
