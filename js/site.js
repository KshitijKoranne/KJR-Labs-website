document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".offer-card, .work-card, .method-step, .close-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

const consolePanel = document.querySelector("[data-tilt]");

if (consolePanel && matchMedia("(hover: hover)").matches) {
  consolePanel.addEventListener("pointermove", (event) => {
    const rect = consolePanel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    consolePanel.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 7}deg)`;
  });

  consolePanel.addEventListener("pointerleave", () => {
    consolePanel.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

const canvas = document.createElement("canvas");
const consoleStage = document.querySelector(".launch-console");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (consoleStage) {
  consoleStage.prepend(canvas);
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let pointer = { x: 0.5, y: 0.5, active: false };
  const nodes = [
    { x: 0.22, y: 0.26, label: "Web" },
    { x: 0.58, y: 0.2, label: "API" },
    { x: 0.78, y: 0.36, label: "Ext" },
    { x: 0.35, y: 0.52, label: "Ops" },
    { x: 0.62, y: 0.62, label: "App" },
    { x: 0.24, y: 0.78, label: "SEO" },
    { x: 0.82, y: 0.78, label: "Ship" }
  ];

  function resizeCanvas() {
    const rect = consoleStage.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);
    const pulse = reducedMotion ? 0.5 : (Math.sin(time / 850) + 1) / 2;
    const points = nodes.map((node, index) => {
      const drift = reducedMotion ? 0 : Math.sin(time / 1200 + index) * 8;
      const attract = pointer.active ? 10 : 0;
      const px = node.x * width + drift + (pointer.x - node.x) * attract;
      const py = node.y * height + Math.cos(time / 1400 + index) * 7 + (pointer.y - node.y) * attract;
      return { ...node, px, py };
    });

    ctx.lineWidth = 1;
    points.forEach((point, index) => {
      points.slice(index + 1).forEach((other) => {
        const distance = Math.hypot(point.px - other.px, point.py - other.py);
        if (distance < width * 0.42) {
          ctx.strokeStyle = `rgba(47, 230, 255, ${0.08 + pulse * 0.08})`;
          ctx.beginPath();
          ctx.moveTo(point.px, point.py);
          ctx.lineTo(other.px, other.py);
          ctx.stroke();
        }
      });
    });

    points.forEach((point, index) => {
      const glow = index % 3 === 0 ? "47,230,255" : index % 3 === 1 ? "92,255,177" : "255,184,77";
      ctx.fillStyle = `rgba(${glow}, 0.16)`;
      ctx.beginPath();
      ctx.arc(point.px, point.py, 16 + pulse * 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgb(${glow})`;
      ctx.beginPath();
      ctx.arc(point.px, point.py, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(244,247,250,0.74)";
      ctx.font = "700 11px Satoshi, sans-serif";
      ctx.fillText(point.label, point.px + 12, point.py - 10);
    });

    if (!reducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  consoleStage.addEventListener("pointermove", (event) => {
    const rect = consoleStage.getBoundingClientRect();
    pointer = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active: true
    };
  });

  consoleStage.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(draw);
}
