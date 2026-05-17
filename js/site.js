import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const portals = {
  start: {
    kicker: "Prologue",
    title: "The idea begins as a small light.",
    copy: "You are the founder carrying the idea. KJR Labs turns that light into websites, extensions, custom software, apps, and automations people can use.",
    color: 0xffd36a,
    actions: [{ label: "Walk to services", target: "services" }, { label: "Go to contact", target: "contact" }]
  },
  about: {
    kicker: "About KJR Labs",
    title: "A small studio for serious digital builds.",
    copy: "We work like a product lab: sharpen the idea, design the moment people remember, build the useful version, and polish the launch surface.",
    color: 0x8dffbd,
    actions: [{ label: "See services", target: "services" }]
  },
  services: {
    kicker: "What we build",
    title: "Websites, extensions, apps, automation and custom software.",
    copy: "High-converting websites. Chrome extensions. Internal portals. SaaS MVPs. Creator utilities. Workflow automation. If it needs to look premium and work hard, it belongs on this road.",
    color: 0x67f3ff,
    actions: [{ label: "Enter projects road", target: "projects" }, { label: "See method", target: "method" }]
  },
  projects: {
    kicker: "Project crossroads",
    title: "Nine roads. Nine proof points.",
    copy: "Take a branch road to inspect the kind of products KJR Labs ships: practical tools, browser utilities, creative generators, and playful web experiences.",
    color: 0xa78bfa,
    projects: true,
    actions: [{ label: "Continue to method", target: "method" }]
  },
  method: {
    kicker: "The KJR method",
    title: "Discover. Design. Build. Launch. Improve.",
    copy: "The first version should not feel like a compromise. It should feel like the sharpest slice of the business outcome, ready to show, sell, test, or use.",
    color: 0xffb84d,
    actions: [{ label: "Go to contact portal", target: "contact" }]
  },
  contact: {
    kicker: "Final portal",
    title: "Bring the messy idea. We will shape the build.",
    copy: "Send the rough brief: what you want to launch, who it is for, what the first version should do, and any references. The path opens from there.",
    color: 0xff8aa7,
    actions: [
      {
        label: "Email the brief",
        href: "mailto:kjrlabs9@gmail.com?subject=Project%20brief%20for%20KJR%20Labs&body=Hi%20KJR%20Labs%2C%0A%0AI%20want%20to%20build%3A%0A%0AWho%20it%20is%20for%3A%0A%0AWhat%20should%20happen%20first%3A%0A%0ATimeline%20or%20budget%20range%3A%0A%0ALinks%20or%20references%3A%0A"
      },
      { label: "Restart walk", target: "start" }
    ]
  }
};

const projects = [
  {
    name: "AZ Tools",
    type: "Utility platform",
    pitch: "A growing web toolkit that proves KJR Labs can organize many small workflows into one polished product surface.",
    url: "https://github.com/KshitijKoranne/aztools-next"
  },
  {
    name: "Tab Time Machine",
    type: "Chrome extension",
    pitch: "A browser recovery product for people who need their tabs, sessions, and research trails back without drama.",
    url: "https://github.com/KshitijKoranne/tab-time-machine"
  },
  {
    name: "Atlasify",
    type: "Map poster app",
    pitch: "A creator tool that turns places into beautiful map artwork, showing the studio's product-design and generation chops.",
    url: "https://github.com/KshitijKoranne/Atlasify"
  },
  {
    name: "UUIDWalls",
    type: "Generative wallpaper",
    pitch: "A playful generative system that turns randomness into visual identity, useful for branded assets and creative utilities.",
    url: "https://github.com/KshitijKoranne/uuidwalls"
  },
  {
    name: "wastemytime.fun",
    type: "Viral web experience",
    pitch: "A tiny internet toy with a clear hook, built to be shared, remembered, and opened again when boredom strikes.",
    url: "https://github.com/KshitijKoranne/wastemytime.fun"
  },
  {
    name: "Verbatim",
    type: "Typography product",
    pitch: "A quote and type-led experience that proves the studio can make content feel designed, not dumped onto a page.",
    url: "https://github.com/KshitijKoranne/verbatim"
  },
  {
    name: "Quick Symbols",
    type: "Chrome extension",
    pitch: "A compact browser utility for faster writing, symbol access, and repeatable micro-workflows inside Chrome.",
    url: "https://github.com/KshitijKoranne/quick-symbols-extension"
  },
  {
    name: "YT Snap",
    type: "YouTube utility",
    pitch: "A focused tool for pulling useful YouTube visuals fast, turning a common creator need into a simple product action.",
    url: "https://github.com/KshitijKoranne/yt-snap"
  },
  {
    name: "X Location Reveal",
    type: "Browser intelligence",
    pitch: "A browser utility that extracts context people miss, showing how extensions can add useful signals to daily browsing.",
    url: "https://github.com/KshitijKoranne/x-location-reveal"
  }
];

const route = [
  { id: "start", x: 0, z: 0 },
  { id: "about", x: 0, z: -8 },
  { id: "services", x: 5, z: -15 },
  { id: "projects", x: 12, z: -15 },
  { id: "method", x: 18, z: -8 },
  { id: "contact", x: 18, z: 0 }
];

const branchNodes = projects.map((project, index) => {
  const side = index % 2 === 0 ? -1 : 1;
  const row = Math.floor(index / 2);
  return {
    id: `project-${index}`,
    x: 12 + side * (4.4 + row * 0.35),
    z: -20 - row * 3.1,
    project
  };
});

const allNodes = [...route, ...branchNodes];
const nodeById = new Map(allNodes.map((node) => [node.id, node]));
const routeIds = route.map((node) => node.id);
const canvas = document.querySelector("#world");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x070910, 0.035);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 220);
const cameraOffset = new THREE.Vector3(13, 15, 15);

const hemi = new THREE.HemisphereLight(0xb9c8ff, 0x16120d, 1.2);
scene.add(hemi);

const moon = new THREE.DirectionalLight(0xd7e2ff, 2.1);
moon.position.set(-8, 18, 8);
moon.castShadow = true;
moon.shadow.mapSize.set(1024, 1024);
scene.add(moon);

const lantern = new THREE.PointLight(0xffd36a, 3.8, 10, 1.8);
scene.add(lantern);

const portalMeshes = new Map();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clock = new THREE.Clock();
let activeId = "start";
let targetNode = nodeById.get("start");

const player = createFounder();
player.position.set(targetNode.x, 0.5, targetNode.z);
scene.add(player);

buildWorld();
updatePanel("start");
applyHashStart();
resize();
window.addEventListener("resize", resize);
window.addEventListener("keydown", onKeyDown);
canvas.addEventListener("pointerdown", onPointerDown);
document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => moveTo(button.dataset.jump));
});
document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => stepRoute(button.dataset.step === "next" ? 1 : -1));
});

animate();

function buildWorld() {
  createSky();
  createGroundIslands();
  createPath(route);
  branchNodes.forEach((branch) => createPath([nodeById.get("projects"), branch], true));
  route.forEach((node, index) => createPortal(node, portals[node.id], index));
  branchNodes.forEach((node, index) => createProjectPortal(node, index));
  scatterTrees();
  scatterCrystals();
}

function createSky() {
  const starGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 380; i += 1) {
    positions.push((Math.random() - 0.5) * 120, 8 + Math.random() * 50, (Math.random() - 0.5) * 120);
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({ color: 0xe6f7ff, size: 0.08, transparent: true, opacity: 0.7 })
  );
  scene.add(stars);
}

function createGroundIslands() {
  const islandMaterial = new THREE.MeshStandardMaterial({ color: 0x1c2530, roughness: 0.88, metalness: 0.02 });
  const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x263b32, roughness: 0.9 });

  [...route, ...branchNodes].forEach((node, index) => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.8, 0.9, 7), islandMaterial);
    base.position.set(node.x, -0.58, node.z);
    base.rotation.y = index * 0.31;
    base.receiveShadow = true;
    scene.add(base);

    const top = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.9, 0.18, 7), grassMaterial);
    top.position.set(node.x, -0.04, node.z);
    top.rotation.y = base.rotation.y;
    top.receiveShadow = true;
    scene.add(top);
  });
}

function createPath(nodes, narrow = false) {
  const material = new THREE.MeshStandardMaterial({ color: narrow ? 0x4d4a3f : 0x5a5548, roughness: 0.78 });
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const length = Math.hypot(dx, dz);
    const road = new THREE.Mesh(new THREE.BoxGeometry(narrow ? 1.25 : 1.55, 0.26, length + 0.6), material);
    road.position.set((a.x + b.x) / 2, 0.08, (a.z + b.z) / 2);
    road.rotation.y = Math.atan2(dx, dz);
    road.castShadow = true;
    road.receiveShadow = true;
    scene.add(road);

    const tileCount = Math.max(2, Math.floor(length / 1.2));
    for (let t = 1; t < tileCount; t += 1) {
      const k = t / tileCount;
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(narrow ? 1.34 : 1.65, 0.035, 0.045),
        new THREE.MeshStandardMaterial({ color: 0x2b2a27, roughness: 0.9 })
      );
      tile.position.set(a.x + dx * k, 0.24, a.z + dz * k);
      tile.rotation.y = road.rotation.y;
      scene.add(tile);
    }
  }
}

function createPortal(node, data, index) {
  const group = new THREE.Group();
  group.position.set(node.x, 0.2, node.z);
  group.userData = { id: node.id };

  const color = data.color;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.16, 0.075, 12, 48),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.2, roughness: 0.42 })
  );
  ring.position.y = 1.68;
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.35, 0.32, 8),
    new THREE.MeshStandardMaterial({ color: 0x2e2c28, roughness: 0.8 })
  );
  plinth.position.y = 0.18;
  plinth.castShadow = true;
  group.add(plinth);

  const light = new THREE.PointLight(color, 1.5, 5, 2);
  light.position.y = 1.7;
  group.add(light);

  const label = createLabel(data.kicker.replace("Portal ", ""), color);
  label.position.set(0, 2.85, 0);
  group.add(label);

  portalMeshes.set(node.id, group);
  scene.add(group);
}

function createProjectPortal(node, index) {
  const { name, type } = node.project;
  const group = new THREE.Group();
  const hue = [0x67f3ff, 0xffd36a, 0xa78bfa, 0x8dffbd, 0xff8aa7][index % 5];
  group.position.set(node.x, 0.2, node.z);
  group.userData = { id: node.id };

  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.MeshStandardMaterial({ color: hue, emissive: hue, emissiveIntensity: 0.75, roughness: 0.38 })
  );
  crystal.position.y = 1.26;
  crystal.castShadow = true;
  group.add(crystal);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.25, 0.26, 6),
    new THREE.MeshStandardMaterial({ color: 0x292822, roughness: 0.8 })
  );
  base.position.y = 0.14;
  group.add(base);

  const label = createLabel(`${name} / ${type}`, hue);
  label.position.set(0, 2.3, 0);
  group.add(label);

  portalMeshes.set(node.id, group);
  scene.add(group);
}

function createLabel(text, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(7,9,16,0.72)";
  roundRect(ctx, 18, 24, 476, 68, 24);
  ctx.fill();
  ctx.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#fff7df";
  ctx.font = "700 28px Satoshi, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.slice(0, 28), 256, 58);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(3.6, 0.9, 1);
  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function createFounder() {
  const group = new THREE.Group();
  const cloak = new THREE.Mesh(
    new THREE.ConeGeometry(0.38, 0.95, 8),
    new THREE.MeshStandardMaterial({ color: 0x273141, roughness: 0.82 })
  );
  cloak.position.y = 0.62;
  cloak.castShadow = true;
  group.add(cloak);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0xf4c28b, roughness: 0.6 })
  );
  head.position.y = 1.25;
  head.castShadow = true;
  group.add(head);

  const idea = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.16, 1),
    new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0xffd36a, emissiveIntensity: 1.9 })
  );
  idea.position.set(0.42, 0.96, -0.05);
  group.add(idea);
  group.userData.idea = idea;

  return group;
}

function scatterTrees() {
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x6c4d35, roughness: 0.9 });
  const leafMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x315f43, roughness: 0.85 }),
    new THREE.MeshStandardMaterial({ color: 0x486b4b, roughness: 0.85 }),
    new THREE.MeshStandardMaterial({ color: 0x2f4858, roughness: 0.85 })
  ];
  allNodes.forEach((node, index) => {
    for (let i = 0; i < 3; i += 1) {
      const angle = index * 1.7 + i * 2.2;
      const radius = 2.25 + Math.random() * 0.9;
      const tree = new THREE.Group();
      tree.position.set(node.x + Math.cos(angle) * radius, 0.1, node.z + Math.sin(angle) * radius);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.6, 5), trunkMaterial);
      trunk.position.y = 0.35;
      trunk.castShadow = true;
      tree.add(trunk);
      const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.1, 6), leafMaterials[(index + i) % leafMaterials.length]);
      leaves.position.y = 1.05;
      leaves.castShadow = true;
      tree.add(leaves);
      scene.add(tree);
    }
  });
}

function scatterCrystals() {
  const colors = [0x67f3ff, 0xa78bfa, 0x8dffbd, 0xffd36a];
  allNodes.forEach((node, index) => {
    const crystal = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.25, 0),
      new THREE.MeshStandardMaterial({
        color: colors[index % colors.length],
        emissive: colors[index % colors.length],
        emissiveIntensity: 0.45,
        roughness: 0.42
      })
    );
    crystal.position.set(node.x - 1.7, 0.45, node.z + 1.8);
    crystal.castShadow = true;
    scene.add(crystal);
  });
}

function onKeyDown(event) {
  const key = event.key.toLowerCase();
  if (["arrowup", "w", "arrowright", "d"].includes(key)) stepRoute(1);
  if (["arrowdown", "s", "arrowleft", "a"].includes(key)) stepRoute(-1);
  if (key === "enter") updatePanel(activeId);
}

function onPointerDown(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects([...portalMeshes.values()], true);
  const portal = intersections.find((hit) => {
    let obj = hit.object;
    while (obj && !obj.userData.id) obj = obj.parent;
    return obj?.userData.id;
  });
  if (portal) {
    let obj = portal.object;
    while (obj && !obj.userData.id) obj = obj.parent;
    moveTo(obj.userData.id);
  }
}

function stepRoute(direction) {
  const currentIndex = routeIds.indexOf(activeId);
  if (currentIndex >= 0) {
    const nextIndex = THREE.MathUtils.clamp(currentIndex + direction, 0, routeIds.length - 1);
    moveTo(routeIds[nextIndex]);
    return;
  }
  moveTo("projects");
}

function moveTo(id) {
  const node = nodeById.get(id);
  if (!node) return;
  targetNode = node;
  activeId = id;
  window.history.replaceState(null, "", `#${id}`);
  updatePanel(id);
}

function updatePanel(id) {
  const node = nodeById.get(id);
  const panel = node?.project
    ? {
        kicker: "Project portal",
        title: node.project.name,
        copy: node.project.pitch,
        color: 0x67f3ff,
        actions: [{ label: "View repo", href: node.project.url }, { label: "Back to projects", target: "projects" }]
      }
    : portals[id] || portals.start;

  document.querySelector("[data-panel-kicker]").textContent = panel.kicker;
  document.querySelector("[data-panel-title]").textContent = panel.title;
  document.querySelector("[data-panel-copy]").textContent = panel.copy;
  document.querySelector("[data-current]").textContent = node?.project ? node.project.name : panel.kicker.replace("Portal ", "");

  const actions = document.querySelector("[data-panel-actions]");
  actions.innerHTML = "";
  (panel.actions || []).forEach((action) => {
    const element = action.href ? document.createElement("a") : document.createElement("button");
    element.className = action.href ? "button primary" : "button ghost";
    element.textContent = action.label;
    if (action.href) {
      element.href = action.href;
      if (action.href.startsWith("http")) {
        element.target = "_blank";
        element.rel = "noreferrer";
      }
    } else {
      element.type = "button";
      element.addEventListener("click", () => moveTo(action.target));
    }
    actions.appendChild(element);
  });

  const projectList = document.querySelector("[data-project-list]");
  projectList.hidden = !panel.projects;
  if (panel.projects) {
    projectList.innerHTML = projects.map((project, index) => (
      `<a href="#project-${index}" data-project-jump="${index}"><strong>${project.name}</strong><span>${project.type}</span></a>`
    )).join("");
    projectList.querySelectorAll("[data-project-jump]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        moveTo(`project-${link.dataset.projectJump}`);
      });
    });
  }
}

function applyHashStart() {
  const id = window.location.hash.replace("#", "");
  if (id && nodeById.has(id)) moveTo(id);
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  const delta = clock.getDelta();
  const elapsed = clock.elapsedTime;
  player.userData.idea.rotation.y += delta * 2.4;
  portalMeshes.forEach((portal) => {
    portal.rotation.y += delta * 0.22;
    portal.position.y = 0.2 + Math.sin(elapsed * 1.5 + portal.position.x) * 0.035;
  });

  const targetPosition = new THREE.Vector3(targetNode.x, 0.5, targetNode.z);
  player.position.lerp(targetPosition, 1 - Math.pow(0.001, delta));
  const direction = targetPosition.clone().sub(player.position);
  if (direction.lengthSq() > 0.0001) {
    player.rotation.y = Math.atan2(direction.x, direction.z);
  }

  const activePortal = portals[activeId];
  const color = new THREE.Color(activePortal?.color || 0xffd36a);
  lantern.color.lerp(color, 0.04);
  lantern.position.copy(player.position).add(new THREE.Vector3(0.55, 1.18, 0.15));

  const cameraTarget = player.position.clone();
  camera.position.lerp(cameraTarget.clone().add(cameraOffset), 1 - Math.pow(0.02, delta));
  camera.lookAt(cameraTarget.x, cameraTarget.y + 0.6, cameraTarget.z);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
