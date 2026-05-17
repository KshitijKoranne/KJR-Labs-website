import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const ASSET_PATHS = {
  character: "images/game/character.png",
  landmarkStart: "images/game/landmark-start.png",
  landmarkServices: "images/game/landmark-services.png",
  landmarkShowcase: "images/game/landmark-showcase.png",
  landmarkProcess: "images/game/landmark-process.png",
  landmarkContact: "images/game/landmark-contact.png",
  project0: "images/game/project-0.png",
  project1: "images/game/project-1.png",
  project2: "images/game/project-2.png",
  project3: "images/game/project-3.png",
  project4: "images/game/project-4.png",
  project5: "images/game/project-5.png",
  project6: "images/game/project-6.png",
  project7: "images/game/project-7.png",
  project8: "images/game/project-8.png"
};
const ENABLE_GENERATED_ASSETS = true;

const emailHref = "mailto:kjrlabs9@gmail.com?subject=Project%20brief%20for%20KJR%20Labs&body=Hi%20KJR%20Labs%2C%0A%0AI%20want%20to%20build%3A%0A%0AWho%20it%20is%20for%3A%0A%0AWhat%20should%20happen%20first%3A%0A%0ATimeline%20or%20budget%20range%3A%0A%0ALinks%20or%20references%3A%0A";

const projects = [
  {
    name: "AZ Tools",
    type: "Utility platform",
    copy: "A compact toolkit village: small workflows, one polished surface.",
    url: "https://github.com/KshitijKoranne/aztools-next"
  },
  {
    name: "Tab Time Machine",
    type: "Chrome extension",
    copy: "A browser recovery trail for lost tabs, sessions, and research.",
    url: "https://github.com/KshitijKoranne/tab-time-machine"
  },
  {
    name: "Atlasify",
    type: "Map poster app",
    copy: "A place-to-poster maker for beautiful location-led products.",
    url: "https://github.com/KshitijKoranne/Atlasify"
  },
  {
    name: "UUIDWalls",
    type: "Generative wallpaper",
    copy: "Randomness turned into identity, pattern, and visual delight.",
    url: "https://github.com/KshitijKoranne/uuidwalls"
  },
  {
    name: "wastemytime.fun",
    type: "Viral web experience",
    copy: "A tiny web toy with a hook people remember and share.",
    url: "https://github.com/KshitijKoranne/wastemytime.fun"
  },
  {
    name: "Verbatim",
    type: "Typography product",
    copy: "A type-led quote world where content feels designed.",
    url: "https://github.com/KshitijKoranne/verbatim"
  },
  {
    name: "Quick Symbols",
    type: "Chrome extension",
    copy: "A fast symbol utility for repeated browser writing moments.",
    url: "https://github.com/KshitijKoranne/quick-symbols-extension"
  },
  {
    name: "YT Snap",
    type: "YouTube utility",
    copy: "A creator shortcut for pulling useful YouTube visuals fast.",
    url: "https://github.com/KshitijKoranne/yt-snap"
  },
  {
    name: "X Location Reveal",
    type: "Browser intelligence",
    copy: "A browsing signal tool that reveals context hidden in plain sight.",
    url: "https://github.com/KshitijKoranne/x-location-reveal"
  }
];

const locations = [
  {
    id: "start",
    name: "Start Camp",
    title: "You arrive with an idea.",
    copy: "Walk the roads. Each landmark reveals one way KJR Labs can build it.",
    position: { x: 0, z: 0 },
    color: 0xffd46b,
    kind: "camp",
    asset: "landmarkStart",
    scale: [5.5, 5]
  },
  {
    id: "services",
    name: "Services Workshop",
    title: "What we build",
    copy: "Websites, Chrome extensions, apps, automations, and custom software.",
    position: { x: 0, z: -20 },
    color: 0x71f4ff,
    kind: "workshop",
    asset: "landmarkServices",
    scale: [5.1, 5.25]
  },
  {
    id: "showcase",
    name: "Showcase Garden",
    title: "Proof roads",
    copy: "Nine branches. Each one leads to a product or experiment.",
    position: { x: 22, z: 0 },
    color: 0xa78bfa,
    kind: "gallery",
    asset: "landmarkShowcase",
    scale: [5.15, 5.65]
  },
  {
    id: "process",
    name: "Process Forge",
    title: "How the build happens",
    copy: "Sharpen the idea, design the memory, build the useful version, polish the launch.",
    position: { x: 0, z: 18 },
    color: 0x87f7a7,
    kind: "forge",
    asset: "landmarkProcess",
    scale: [5.15, 5.75]
  },
  {
    id: "contact",
    name: "Contact Portal",
    title: "Ready to brief the build?",
    copy: "Bring the rough version. We will shape the first playable product path.",
    position: { x: -22, z: 0 },
    color: 0xff93b5,
    kind: "portal",
    asset: "landmarkContact",
    scale: [5.15, 5.1],
    actions: [{ label: "Email brief", href: emailHref, primary: true }]
  }
];

const projectLocations = projects.map((project, index) => {
  const row = index - 4;
  return {
    id: `project-${index}`,
    name: project.name,
    title: project.name,
    copy: project.copy,
    position: { x: 34, z: row * 4.2 },
    color: [0x71f4ff, 0xffd46b, 0xa78bfa, 0x87f7a7, 0xff93b5][index % 5],
    kind: "project",
    project,
    actions: [{ label: "View repo", href: project.url, primary: true }]
  };
});

const allLocations = [...locations, ...projectLocations];
const walkZones = [
  { type: "circle", x: 0, z: 0, r: 7.2 },
  { type: "circle", x: 0, z: -20, r: 5.4 },
  { type: "circle", x: 22, z: 0, r: 6.2 },
  { type: "circle", x: 0, z: 18, r: 5.4 },
  { type: "circle", x: -22, z: 0, r: 5.4 },
  { type: "rect", x: 0, z: -10, w: 3.7, d: 22 },
  { type: "rect", x: 11, z: 0, w: 24, d: 3.7 },
  { type: "rect", x: -11, z: 0, w: 24, d: 3.7 },
  { type: "rect", x: 0, z: 9, w: 3.7, d: 20 }
];

projectLocations.forEach((location) => {
  walkZones.push({ type: "circle", x: location.position.x, z: location.position.z, r: 2.7 });
  walkZones.push({ type: "rect", x: 28, z: location.position.z, w: 13, d: 1.7 });
});

const obstacles = [
  { x: -4.2, z: -4.2, r: 0.9 },
  { x: 4.4, z: 3.9, r: 0.9 },
  { x: -4.8, z: 3.6, r: 0.8 },
  { x: 17.4, z: -4.9, r: 1.1 },
  { x: 17.1, z: 4.8, r: 1.1 },
  { x: -17.6, z: -4.4, r: 1.1 },
  { x: 4.4, z: 14.2, r: 1 },
  { x: -4.5, z: -16.4, r: 1 }
];

const state = {
  keys: new Set(),
  playerRadius: 0.45,
  speed: 6.2,
  activeLocation: null,
  tapTarget: null,
  loaded: false
};

const dom = {
  canvas: document.querySelector("#world"),
  loading: document.querySelector("[data-loading]"),
  loadingBar: document.querySelector("[data-loading-bar]"),
  loadingStatus: document.querySelector("[data-loading-status]"),
  dialogue: document.querySelector("[data-dialogue]"),
  dialogueKicker: document.querySelector("[data-dialogue-kicker]"),
  dialogueTitle: document.querySelector("[data-dialogue-title]"),
  dialogueCopy: document.querySelector("[data-dialogue-copy]"),
  dialogueActions: document.querySelector("[data-dialogue-actions]"),
  area: document.querySelector("[data-area]"),
  nearby: document.querySelector("[data-nearby]"),
  prompt: document.querySelector("[data-prompt]"),
  tapMarker: document.querySelector("[data-tap-marker]")
};

const renderer = new THREE.WebGLRenderer({ canvas: dom.canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa7dcff);
scene.fog = new THREE.Fog(0xa7dcff, 36, 88);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 180);
const cameraOffset = new THREE.Vector3(11, 14, 13);
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

const hemi = new THREE.HemisphereLight(0xffffff, 0x57735b, 1.35);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff0cf, 2.6);
sun.position.set(-8, 18, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536);
scene.add(sun);

const lantern = new THREE.PointLight(0xffd46b, 4.6, 9, 1.8);
scene.add(lantern);

const interactionObjects = new Map();
const assetTextures = ENABLE_GENERATED_ASSETS ? await loadGameAssets() : {};
const player = createPlayer();
player.position.set(0, 0.08, 2.5);
scene.add(player);

showLoadingProgress();
buildWorld(assetTextures);
resize();
window.addEventListener("resize", resize);
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
dom.canvas.addEventListener("pointerdown", onPointerDown);
document.querySelector(".brand")?.addEventListener("click", (event) => {
  event.preventDefault();
  setTapTarget(new THREE.Vector3(0, 0, 2.5));
});

setTimeout(() => {
  state.loaded = true;
  dom.loading?.classList.add("is-done");
}, 1700);

animate();

async function loadGameAssets() {
  const loader = new THREE.TextureLoader();
  const entries = await Promise.all(Object.entries(ASSET_PATHS).map(([key, path]) => (
    new Promise((resolve) => {
      loader.load(
        path,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          resolve([key, texture]);
        },
        undefined,
        () => resolve([key, null])
      );
    })
  )));
  return Object.fromEntries(entries);
}

function showLoadingProgress() {
  const statuses = [
    "Drawing the first road...",
    "Placing the project branches...",
    "Lighting the idea lantern...",
    "Opening the studio gates..."
  ];
  let tick = 0;
  const interval = window.setInterval(() => {
    tick += 1;
    const progress = Math.min(100, tick * 17);
    if (dom.loadingBar) dom.loadingBar.style.width = `${progress}%`;
    if (dom.loadingStatus) dom.loadingStatus.textContent = statuses[tick % statuses.length];
    if (progress >= 100) window.clearInterval(interval);
  }, 230);
}

function buildWorld() {
  createTerrain();
  createRoads();
  createLandmarks();
  createProjectRoads();
  createDecor();
  updateInteraction(null);
}

function createTerrain() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(92, 66, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6dbb74, roughness: 0.92 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.04;
  ground.receiveShadow = true;
  scene.add(ground);

  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(110, 80),
    new THREE.MeshStandardMaterial({ color: 0x74c7de, roughness: 0.55, metalness: 0.02 })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.11;
  scene.add(water);

  const inner = new THREE.Mesh(
    new THREE.PlaneGeometry(72, 52),
    new THREE.MeshStandardMaterial({ color: 0x78c977, roughness: 0.94 })
  );
  inner.rotation.x = -Math.PI / 2;
  inner.receiveShadow = true;
  scene.add(inner);
}

function createRoads() {
  createWalkCircle(0, 0, 7.2, 0xf1d28b);
  createWalkCircle(0, -20, 5.4, 0xe9c77a);
  createWalkCircle(22, 0, 6.2, 0xe7ca86);
  createWalkCircle(0, 18, 5.4, 0xe9c77a);
  createWalkCircle(-22, 0, 5.4, 0xe9c77a);
  createRoadRect(0, -10, 3.7, 22);
  createRoadRect(11, 0, 24, 3.7);
  createRoadRect(-11, 0, 24, 3.7);
  createRoadRect(0, 9, 3.7, 20);
}

function createProjectRoads() {
  projectLocations.forEach((location, index) => {
    createWalkCircle(location.position.x, location.position.z, 2.7, 0xe7cb8e);
    createRoadRect(28, location.position.z, 13, 1.7);
    createProjectPortal(location, index);
    createSign(location.position.x - 1.8, location.position.z + 1.7, location.name, location.color);
  });
}

function createWalkCircle(x, z, radius, color) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, 0.08, 36),
    new THREE.MeshStandardMaterial({ color, roughness: 0.88 })
  );
  mesh.position.set(x, 0.01, z);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function createRoadRect(x, z, width, depth) {
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.09, depth),
    new THREE.MeshStandardMaterial({ color: 0xe0bd72, roughness: 0.86 })
  );
  road.position.set(x, 0.015, z);
  road.receiveShadow = true;
  scene.add(road);

  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.24, 0.035, depth + 0.24),
    new THREE.MeshStandardMaterial({ color: 0xb9894e, roughness: 0.9 })
  );
  edge.position.set(x, -0.005, z);
  edge.receiveShadow = true;
  scene.add(edge);
  road.position.y = 0.03;
}

function createLandmarks() {
  locations.forEach((location) => {
    const group = new THREE.Group();
    group.position.set(location.position.x, 0.08, location.position.z);
    group.userData.locationId = location.id;

    if (!addAssetSprite(group, location.asset, location.scale, 2.45)) {
      if (location.kind === "camp") createCamp(group, location.color);
      if (location.kind === "workshop") createWorkshop(group, location.color);
      if (location.kind === "gallery") createGallery(group, location.color);
      if (location.kind === "forge") createForge(group, location.color);
      if (location.kind === "portal") createContactPortal(group, location.color);
    }

    const glow = new THREE.PointLight(location.color, 1.8, 8, 2);
    glow.position.y = 2.4;
    group.add(glow);
    scene.add(group);
    interactionObjects.set(location.id, group);
    createSign(location.position.x - 2.4, location.position.z + 2.4, location.name, location.color);
  });
}

function createCamp(group, color) {
  group.add(createLanternTower(0, 0, color));
  group.add(createTent(-1.8, -0.7, 0xff9f43));
  group.add(createTent(1.8, -0.6, 0x71f4ff));
}

function createWorkshop(group, color) {
  group.add(createHouse(0, 0, color, 2.8, 2.2));
  group.add(createChimney(1.1, -0.4));
}

function createGallery(group, color) {
  group.add(createHouse(0, 0, color, 3.2, 1.9));
  group.add(createCrystal(2.3, 0.5, 0xa78bfa, 1.2));
  group.add(createCrystal(-2.3, 0.5, 0x71f4ff, 1.2));
}

function createForge(group, color) {
  group.add(createHouse(0, 0, color, 2.7, 2.5));
  group.add(createCrystal(1.8, -0.9, 0x87f7a7, 1.4));
}

function createContactPortal(group, color) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.3, 0.09, 16, 48),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.2, roughness: 0.38 })
  );
  ring.position.y = 1.75;
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  group.add(createCrystal(0, 0, color, 1));
}

function createProjectPortal(location, index) {
  const group = new THREE.Group();
  group.position.set(location.position.x, 0.08, location.position.z);
  group.userData.locationId = location.id;
  if (!addAssetSprite(group, `project${index}`, [3.25, 3.55], 1.8)) {
    group.add(createCrystal(0, 0, location.color, 1.25));
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.22, 0.3, 7),
      new THREE.MeshStandardMaterial({ color: 0x6b5b42, roughness: 0.88 })
    );
    base.position.y = 0.15;
    base.castShadow = true;
    group.add(base);
  }

  const light = new THREE.PointLight(location.color, 1.25, 5, 2);
  light.position.y = 1.7;
  group.add(light);
  scene.add(group);
  interactionObjects.set(location.id, group);
}

function createHouse(x, z, color, width, depth) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, 1.5, depth),
    new THREE.MeshStandardMaterial({ color: 0xfff4cc, roughness: 0.82 })
  );
  body.position.y = 0.8;
  body.castShadow = true;
  group.add(body);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(width, depth) * 0.78, 1.1, 4),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
  );
  roof.position.y = 1.9;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  group.add(roof);
  return group;
}

function createTent(x, z, color) {
  const tent = new THREE.Mesh(
    new THREE.ConeGeometry(1.25, 1.25, 4),
    new THREE.MeshStandardMaterial({ color, roughness: 0.84 })
  );
  tent.position.set(x, 0.65, z);
  tent.rotation.y = Math.PI / 4;
  tent.castShadow = true;
  return tent;
}

function createLanternTower(x, z, color) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.11, 2.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x6c4d35, roughness: 0.86 })
  );
  post.position.y = 1.05;
  post.castShadow = true;
  group.add(post);
  const lamp = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.38, 1),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.8, roughness: 0.42 })
  );
  lamp.position.y = 2.15;
  group.add(lamp);
  return group;
}

function createChimney(x, z) {
  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 1.1, 0.34),
    new THREE.MeshStandardMaterial({ color: 0x9b6c4a, roughness: 0.86 })
  );
  chimney.position.set(x, 2, z);
  chimney.castShadow = true;
  return chimney;
}

function createCrystal(x, z, color, scale) {
  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(scale, 0),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.85, roughness: 0.38 })
  );
  crystal.position.set(x, 1.05, z);
  crystal.castShadow = true;
  return crystal;
}

function createSign(x, z, text, color) {
  const sprite = createLabel(text, color);
  sprite.position.set(x, 2.25, z);
  scene.add(sprite);
}

function addAssetSprite(group, textureKey, scale, y) {
  const texture = assetTextures[textureKey];
  if (!texture) return false;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.08
  }));
  sprite.scale.set(scale[0], scale[1], 1);
  sprite.position.y = y;
  group.add(sprite);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(Math.max(scale[0], scale[1]) * 0.28, 28),
    new THREE.MeshBasicMaterial({ color: 0x172018, transparent: true, opacity: 0.18, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  group.add(shadow);
  return true;
}

function createLabel(text, color) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  const ctx = labelCanvas.getContext("2d");
  ctx.fillStyle = "rgba(17,24,39,0.82)";
  roundRect(ctx, 20, 24, 472, 70, 18);
  ctx.fill();
  ctx.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#fff9e8";
  ctx.font = "800 28px Satoshi, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.slice(0, 27), 256, 60);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(4, 1, 1);
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

function createDecor() {
  const treePositions = [
    [-8, -8], [-8, 7], [8, -7], [8, 7], [-18, -8], [-18, 8], [15, -10], [14, 9],
    [-6, -23], [5, -24], [-7, 22], [7, 22], [28, -15], [28, 15], [39, -10], [39, 10]
  ];
  treePositions.forEach(([x, z], index) => scene.add(createTree(x, z, index)));
  obstacles.forEach((obstacle, index) => scene.add(createBush(obstacle.x, obstacle.z, index)));
}

function createTree(x, z, index) {
  const group = new THREE.Group();
  group.position.set(x, 0.02, z);
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.18, 0.9, 7),
    new THREE.MeshStandardMaterial({ color: 0x7a5132, roughness: 0.9 })
  );
  trunk.position.y = 0.45;
  trunk.castShadow = true;
  group.add(trunk);
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(0.72, 1.45, 7),
    new THREE.MeshStandardMaterial({ color: [0x4aa36b, 0x5faf78, 0x3f8f6b][index % 3], roughness: 0.88 })
  );
  leaves.position.y = 1.42;
  leaves.castShadow = true;
  group.add(leaves);
  return group;
}

function createBush(x, z, index) {
  const bush = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.68, 0),
    new THREE.MeshStandardMaterial({ color: [0x4cae68, 0x69bd71, 0x5b9f85][index % 3], roughness: 0.9 })
  );
  bush.position.set(x, 0.45, z);
  bush.scale.y = 0.65;
  bush.castShadow = true;
  return bush;
}

function createPlayer() {
  const group = new THREE.Group();
  if (assetTextures.character) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: assetTextures.character,
      transparent: true,
      alphaTest: 0.08
    }));
    sprite.scale.set(1.55, 2.72, 1);
    sprite.position.y = 1.38;
    group.add(sprite);

    const idea = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.13, 1),
      new THREE.MeshStandardMaterial({ color: 0xffd46b, emissive: 0xffd46b, emissiveIntensity: 2.4 })
    );
    idea.position.set(0.5, 1.25, -0.05);
    group.add(idea);
    group.userData.idea = idea;
    return group;
  }

  const cloak = new THREE.Mesh(
    new THREE.ConeGeometry(0.42, 1.05, 9),
    new THREE.MeshStandardMaterial({ color: 0x35527c, roughness: 0.78 })
  );
  cloak.position.y = 0.7;
  cloak.castShadow = true;
  group.add(cloak);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 18, 14),
    new THREE.MeshStandardMaterial({ color: 0xf5c28f, roughness: 0.58 })
  );
  head.position.y = 1.35;
  head.castShadow = true;
  group.add(head);

  const idea = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.18, 1),
    new THREE.MeshStandardMaterial({ color: 0xffd46b, emissive: 0xffd46b, emissiveIntensity: 2.1 })
  );
  idea.position.set(0.48, 1.02, -0.05);
  group.add(idea);
  group.userData.idea = idea;
  return group;
}

function onKeyDown(event) {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    event.preventDefault();
    state.tapTarget = null;
    state.keys.add(key);
    hideTapMarker();
  }
  if (key === "e" && state.activeLocation) {
    activatePrimaryAction(state.activeLocation);
  }
}

function onKeyUp(event) {
  state.keys.delete(event.key.toLowerCase());
}

function onPointerDown(event) {
  const hit = getGroundPoint(event);
  if (!hit || !isWalkable(hit.x, hit.z)) return;
  setTapTarget(hit);
  showTapMarker(event.clientX, event.clientY);
}

function getGroundPoint(event) {
  const rect = dom.canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const point = new THREE.Vector3();
  return raycaster.ray.intersectPlane(groundPlane, point);
}

function setTapTarget(point) {
  state.tapTarget = new THREE.Vector3(point.x, 0.08, point.z);
}

function showTapMarker(x, y) {
  if (!dom.tapMarker) return;
  dom.tapMarker.hidden = false;
  dom.tapMarker.style.left = `${x}px`;
  dom.tapMarker.style.top = `${y}px`;
}

function hideTapMarker() {
  if (dom.tapMarker) dom.tapMarker.hidden = true;
}

function movePlayer(delta) {
  const direction = new THREE.Vector3();
  if (state.keys.has("w") || state.keys.has("arrowup")) direction.z -= 1;
  if (state.keys.has("s") || state.keys.has("arrowdown")) direction.z += 1;
  if (state.keys.has("a") || state.keys.has("arrowleft")) direction.x -= 1;
  if (state.keys.has("d") || state.keys.has("arrowright")) direction.x += 1;

  if (state.tapTarget) {
    direction.copy(state.tapTarget).sub(player.position);
    direction.y = 0;
    if (direction.length() < 0.18) {
      state.tapTarget = null;
      hideTapMarker();
      direction.set(0, 0, 0);
    }
  }

  if (direction.lengthSq() === 0) return;
  direction.normalize();
  const next = player.position.clone().addScaledVector(direction, state.speed * delta);
  if (canOccupy(next.x, next.z)) {
    player.position.copy(next);
    player.rotation.y = Math.atan2(direction.x, direction.z);
  } else {
    state.tapTarget = null;
    hideTapMarker();
  }
}

function canOccupy(x, z) {
  if (!isWalkable(x, z)) return false;
  return !obstacles.some((obstacle) => distance2D(x, z, obstacle.x, obstacle.z) < obstacle.r + state.playerRadius);
}

function isWalkable(x, z) {
  return walkZones.some((zone) => {
    if (zone.type === "circle") return distance2D(x, z, zone.x, zone.z) <= zone.r;
    return Math.abs(x - zone.x) <= zone.w / 2 && Math.abs(z - zone.z) <= zone.d / 2;
  });
}

function distance2D(ax, az, bx, bz) {
  return Math.hypot(ax - bx, az - bz);
}

function updateNearby() {
  let nearest = null;
  let nearestDistance = Infinity;
  allLocations.forEach((location) => {
    const distance = distance2D(player.position.x, player.position.z, location.position.x, location.position.z);
    if (distance < nearestDistance) {
      nearest = location;
      nearestDistance = distance;
    }
  });

  const active = nearestDistance < (nearest?.kind === "project" ? 2.7 : 4.2) ? nearest : null;
  if (active?.id !== state.activeLocation?.id) {
    state.activeLocation = active;
    updateInteraction(active);
  }

  if (dom.area && nearest) dom.area.textContent = nearestDistance < 6 ? nearest.name : "Open Road";
  if (dom.nearby) dom.nearby.textContent = active ? active.name : "Follow a road";
  if (dom.prompt) {
    dom.prompt.hidden = Boolean(active);
    dom.prompt.textContent = nearest ? `Nearest: ${nearest.name}` : "Explore the hub";
  }
}

function updateInteraction(location) {
  if (!dom.dialogue) return;
  if (!location) {
    dom.dialogue.hidden = true;
    return;
  }

  dom.dialogue.hidden = false;
  dom.dialogueKicker.textContent = location.kind === "project" ? location.project.type : location.name;
  dom.dialogueTitle.textContent = location.title;
  dom.dialogueCopy.textContent = location.copy;
  dom.dialogueActions.innerHTML = "";

  const actions = location.actions || [{ label: "Continue exploring", primary: false }];
  actions.forEach((action) => {
    const element = action.href ? document.createElement("a") : document.createElement("button");
    element.className = action.primary ? "button primary" : "button";
    element.textContent = action.label;
    if (action.href) {
      element.href = action.href;
      if (action.href.startsWith("http")) {
        element.target = "_blank";
        element.rel = "noreferrer";
      }
    } else {
      element.type = "button";
      element.addEventListener("click", () => {
        dom.dialogue.hidden = true;
      });
    }
    dom.dialogueActions.appendChild(element);
  });
}

function activatePrimaryAction(location) {
  const action = location.actions?.[0];
  if (action?.href) window.location.href = action.href;
}

function animateScene(delta, elapsed) {
  player.userData.idea.rotation.y += delta * 2.8;
  player.userData.idea.position.y = 1.02 + Math.sin(elapsed * 5) * 0.035;
  lantern.position.copy(player.position).add(new THREE.Vector3(0.52, 1.12, 0.05));
  lantern.intensity = 4.4 + Math.sin(elapsed * 4) * 0.45;

  interactionObjects.forEach((object, id) => {
    const location = allLocations.find((item) => item.id === id);
    if (location?.kind === "project") object.rotation.y += delta * 0.7;
  });
}

function updateCamera(delta) {
  const target = player.position.clone();
  const desired = target.clone().add(cameraOffset);
  camera.position.lerp(desired, 1 - Math.pow(0.03, delta));
  camera.lookAt(target.x, target.y + 0.55, target.z);
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;
  movePlayer(delta);
  updateNearby();
  animateScene(delta, elapsed);
  updateCamera(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
