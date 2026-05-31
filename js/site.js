const navToggle = document.querySelector(".nav-toggle");

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-left a, .nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function buildMailto(formData) {
  const subject = encodeURIComponent("Project brief for KJR Labs");
  const body = encodeURIComponent(
    [
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Project type: ${formData.get("project_type") || ""}`,
      `Timeline: ${formData.get("timeline") || ""}`,
      `Budget: ${formData.get("budget") || ""}`,
      "",
      "Requirement:",
      formData.get("message") || "",
    ].join("\n")
  );

  return `mailto:kjrlabs9@gmail.com?subject=${subject}&body=${body}`;
}

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector(".form-status");
    const formData = new FormData(form);
    const originalText = submitButton?.textContent || "Send Requirement";

    if (status) status.textContent = "Sending...";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams(formData),
      });

      if (!response.ok) throw new Error("Form service unavailable");

      const result = await response.json();
      window.location.href = result.redirect || "/thank-you.html";
    } catch {
      if (status) status.textContent = "Email service is not ready. Opening your email app with the filled brief.";
      window.location.href = buildMailto(formData);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
});
