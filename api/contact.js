const DEFAULT_TO_EMAIL = "kjrlabs9@gmail.com";

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;

  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return Object.fromEntries(new URLSearchParams(req.body));
}

function clean(value) {
  return String(value || "").trim();
}

function mailtoUrl(data) {
  const subject = encodeURIComponent("Project brief for KJR Labs");
  const body = encodeURIComponent(
    [
      `Name: ${clean(data.name)}`,
      `Email: ${clean(data.email)}`,
      `Project type: ${clean(data.project_type)}`,
      `Timeline: ${clean(data.timeline)}`,
      `Budget: ${clean(data.budget)}`,
      "",
      "Requirement:",
      clean(data.message),
    ].join("\n")
  );

  return `mailto:${DEFAULT_TO_EMAIL}?subject=${subject}&body=${body}`;
}

function fallbackHtml(data, message) {
  const href = mailtoUrl(data);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Send Your Brief | KJR Labs</title>
  <link rel="stylesheet" href="/css/site.css?v=20260531a">
</head>
<body class="redirect-page">
  <main class="noscript-panel">
    <h1>One More Step</h1>
    <p>${message}</p>
    <p><a href="${href}">Open your email with this brief</a></p>
    <p><a href="/contact.html#lead-form">Back to the form</a></p>
  </main>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const data = readBody(req);

  if (clean(data._honey)) {
    return res.status(200).json({ ok: true, redirect: "/thank-you.html" });
  }

  const name = clean(data.name);
  const email = clean(data.email);
  const projectType = clean(data.project_type);
  const message = clean(data.message);

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ ok: false, error: "Please fill the required fields." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "KJR Labs <onboarding@resend.dev>";

  if (!apiKey) {
    const html = fallbackHtml(data, "The direct email service is not configured yet. Your message is still ready to send by email.");
    return res.status(503).setHeader("Content-Type", "text/html; charset=utf-8").send(html);
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Timeline: ${clean(data.timeline) || "Not provided"}`,
    `Budget: ${clean(data.budget) || "Not provided"}`,
    `Source: ${clean(data.source_page) || "Website form"}`,
    "",
    "Requirement:",
    message,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New KJR Labs inquiry from ${name}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    const html = fallbackHtml(data, "The direct email service could not send this message right now. Your brief is ready to send by email instead.");
    return res.status(502).setHeader("Content-Type", "text/html; charset=utf-8").send(html);
  }

  if ((req.headers.accept || "").includes("application/json")) {
    return res.status(200).json({ ok: true, redirect: "/thank-you.html" });
  }

  return res.redirect(303, "/thank-you.html");
};
