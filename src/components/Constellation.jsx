import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Resume star data ─────────────────────────────────────────────────────────
const STARS = [
  {
    id: "game_design",
    name: "Game Design",
    color: "#ffb877",
    role: "Game Development",
    posArc:  [-2.8,  1.4,  0.3],
    posLine: [-0.18, 2.2,  0.12],
    intro: "Games have been a huge part of my life. From Magic: the Gathering to League of Legends, I love the challenges that playing them presents. That love has led me to build several games myself.",
    highlights: ["Card Games", "Prototyping", "Rogue-lites", "Extensible Systems"],
    note: "Make games you want to play. The rest will follow.",
    tags: ["Unity", "C#", "Web Games", "Typescript"],
  },
  {
    id: "engineering",
    name: "Software Engineering",
    color: "#97d0f9",
    role: "Full-Stack Development",
    posArc:  [-1.1, -0.8, -0.2],
    posLine: [ 0.22, 1.1, -0.15],
    intro: "I strive to write code that is both easily maintainable and extensible. I want to create systems that account for future problems.",
    highlights: ["React / TypeScript", "Node & APIs", "System Architecture", "Performance"],
    note: "A user with this password already exists!",
    tags: ["React", "Node.js", "MongoDB", "AWS", "Typescript", "AI", "Next.js", "Tailwind"],
  },
  {
    id: "philosophy",
    name: "Philosophy",
    color: "#faa27f",
    role: "Mind, Meta-Ethics",
    posArc:  [ 0.3,  1.1,  0.4],
    posLine: [-0.12, 0,    0.2 ],
    intro: "I find philosophy to be a very exciting subject area. Asking big, important questions with uncertain answers is profoundly meaningful to me.",
    highlights: ["Non-cognitivism", "Panpsychism", "Utilitarianism", "Continental"],
    note: "For there to be doubt, there must be a doubter",
    tags: ["Formal Logic", "Propositions", "Communication", "Abstract Thinking"],
  },
  {
    id: "mtg",
    name: "Magic: The Gathering",
    color: "#aad4ff",
    role: "The Greatest Game",
    posArc:  [ 1.6, -0.7, -0.3],
    posLine: [ 0.2, -1.1, -0.1],
    intro: "I spend a lot of time playing and making MTG. I fell in love with MTG because of its rules system; everything fits neatly into a (mostly) eloquent system. Sound familiar?",
    highlights: ["Rules", "Commander"],
    note: "Its Lightning Helix!",
    tags: ["Logic", "Communication", "Creativity"],
  },
  {
    id: "contact",
    name: "Contact",
    color: "#ffd0a0",
    role: "Get In Touch",
    posArc:  [ 2.8,  0.6,  0.1],
    posLine: [-0.15,-2.2,  0.08],
    intro: "I'm always open to talk about anything!",
    highlights: ["loftylogan@gmail.com", "210-412-3039", "@loganleetwentythree", "loganlee23"],
    note: "It's not aout what you know, it's about who you know.",
    tags: [],
  },
];

const CONNECTIONS = [
  ["game_design", "engineering"],
  ["engineering", "philosophy"],
  ["philosophy", "mtg"],
  ["mtg", "contact"],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function lerpPos(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}
function easeInOut(t) {
  t = Math.min(1, Math.max(0, t));
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Constellation lines ──────────────────────────────────────────────────────
// Lines live in a separate scene-level group that mirrors rotGroupRef's rotation,
// sidestepping any interaction issues with Html portals inside the star group.
function ConstellationLines({ rotGroupRef, posRefsRef }) {
  const { scene } = useThree();
  const lineGroupRef = useRef(null);
  const linesData = useRef([]);

  useEffect(() => {
    const group = new THREE.Group();
    scene.add(group);
    lineGroupRef.current = group;

    const lines = CONNECTIONS.map(([a, b]) => {
      const ai = STARS.findIndex(s => s.id === a);
      const bi = STARS.findIndex(s => s.id === b);
      const pa = STARS[ai].posArc;
      const pb = STARS[bi].posArc;

      const geometry = new THREE.BufferGeometry();
      const buf = new Float32Array([pa[0], pa[1], pa[2], pb[0], pb[1], pb[2]]);
      geometry.setAttribute("position", new THREE.BufferAttribute(buf, 3));

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("#c8a84b"),
        transparent: true,
        opacity: 0.55,
        depthTest: false,
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
      return { line, ai, bi };
    });

    linesData.current = lines;

    return () => {
      lines.forEach(({ line }) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      scene.remove(group);
    };
  }, [scene]);

  useFrame(() => {
    // No rotation to mirror — constellation is stationary, camera orbits

    // Update endpoints from the animated star positions
    linesData.current.forEach(({ line, ai, bi }) => {
      const pa = posRefsRef.current[ai];
      const pb = posRefsRef.current[bi];
      if (!pa || !pb) return;
      const attr = line.geometry.attributes.position;
      attr.setXYZ(0, pa[0], pa[1], pa[2]);
      attr.setXYZ(1, pb[0], pb[1], pb[2]);
      attr.needsUpdate = true;
    });
  });

  return null;
}

// ─── Circular sprite texture ──────────────────────────────────────────────────
function makeCircleTexture(size = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d");
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.8)");
  g.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// ─── Colorful background starfield ───────────────────────────────────────────
function ColorStarfield() {
  const { scene } = useThree();
  useEffect(() => {
    const sprite = makeCircleTexture(64);
    const COUNT = 9000;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color("#ffffff"), new THREE.Color("#ffffff"), new THREE.Color("#ffffff"),
      new THREE.Color("#88bbff"), new THREE.Color("#ffcc55"), new THREE.Color("#ff88aa"),
      new THREE.Color("#55eecc"), new THREE.Color("#cc99ff"), new THREE.Color("#ff9955"),
      new THREE.Color("#aaddff"),
    ];
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 60 + Math.random() * 40;
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      const base  = palette[Math.floor(Math.random() * palette.length)];
      const blend = 0.05 + Math.random() * 0.15;
      colors[i*3]   = Math.min(1, base.r*(1-blend)+blend);
      colors[i*3+1] = Math.min(1, base.g*(1-blend)+blend);
      colors[i*3+2] = Math.min(1, base.b*(1-blend)+blend);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.55, map: sprite, vertexColors: true, transparent: true,
      opacity: 0.9, alphaTest: 0.01, sizeAttenuation: true, depthWrite: false,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return () => { scene.remove(pts); geo.dispose(); mat.dispose(); sprite.dispose(); };
  }, [scene]);
  return null;
}

// ─── Milky Way band (stars + core + dust only, no gas glow) ──────────────────
function MilkyWay() {
  const { scene } = useThree();
  useEffect(() => {
    const objects = [];
    const sprite = makeCircleTexture(64);

    const tiltMatrix = new THREE.Matrix4()
      .makeRotationX(0.45)
      .multiply(new THREE.Matrix4().makeRotationZ(0.3));

    function gauss() { return Math.random() + Math.random() + Math.random() - 1.5; }

    function addLayer(count, bandWidth, rMin, rMax, colorFn, size, opacity, blending = THREE.AdditiveBlending) {
      const positions = new Float32Array(count * 3);
      const colors    = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle  = Math.random() * Math.PI * 2;
        const g      = gauss();
        const offset = g * bandWidth;
        const r      = rMin + Math.random() * (rMax - rMin);
        const cosA = Math.cos(angle), sinA = Math.sin(angle);
        const cosO = Math.cos(offset), sinO = Math.sin(offset);
        const v = new THREE.Vector3(r*cosA*cosO, r*sinO, r*sinA*cosO).applyMatrix4(tiltMatrix);
        positions[i*3] = v.x; positions[i*3+1] = v.y; positions[i*3+2] = v.z;
        const c = colorFn(Math.abs(g), angle);
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({
        size, map: sprite, vertexColors: true, transparent: true,
        opacity, alphaTest: 0.01, sizeAttenuation: true, depthWrite: false, blending,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      objects.push({ pts, geo, mat });
    }

    // 1. Main star band — warm core fading to cool edges
    addLayer(28000, 0.32, 70, 85, (nd, angle) => {
      const env  = Math.exp(-nd * nd * 1.4);
      const t    = Math.min(1, nd * 1.2);
      const col  = new THREE.Color("#ffe8c0")
        .lerp(new THREE.Color("#d4c8b0"), t)
        .lerp(new THREE.Color("#b0b8c8"), Math.max(0, t - 0.5) * 2);
      return col.multiplyScalar(env * (0.65 + Math.random() * 0.35));
    }, 0.4, 0.85);

    // 2. Bright dense core strip
    addLayer(8000, 0.10, 71, 81, (nd) => {
      return new THREE.Color("#fff5e0")
        .multiplyScalar(Math.exp(-nd*nd*2.5) * (0.7 + Math.random()*0.3));
    }, 0.45, 0.95);

    // 3. Dust lanes — dark rifts, NormalBlending to absorb light
    addLayer(1800, 0.06, 71, 80, () =>
      new THREE.Color("#080408").multiplyScalar(0.85 + Math.random()*0.15),
      4.5, 0.28, THREE.NormalBlending);

    // 4. Thinner secondary dust filaments
    addLayer(900, 0.04, 72, 80, () =>
      new THREE.Color("#0a0508").multiplyScalar(0.9 + Math.random()*0.1),
      3.0, 0.20, THREE.NormalBlending);

    return () => {
      objects.forEach(({ pts, geo, mat }) => { scene.remove(pts); geo.dispose(); mat.dispose(); });
      sprite.dispose();
    };
  }, [scene]);
  return null;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ selectedId, expandedRef, onSelect, canvasSize }) {
  const posRefsRef = useRef(STARS.map(s => [...s.posArc]));
  const morphT = useRef(0);
  const meshRefs = useRef(STARS.map(() => ({ group: null, mesh: null, light: null })));

  const orbitCurrent = useRef({ theta: 0, phi: 0 });
  const BASE_RADIUS = 6.5;
  const PHI_LIMIT = Math.PI / 2 - 0.05;
  const mouseDeltaRef = useRef(0);
  // Canvas is "small" when it's the sidebar (expanded panel open)
  const isLargeCanvas = () => (canvasSize.width || window.innerWidth) > 300;

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const onMouseMove = (e) => {
      mouseDeltaRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
      if (document.pointerLockElement !== canvas) return;
      const sensitivity = 0.004;
      orbitCurrent.current.theta -= e.movementX * sensitivity;
      orbitCurrent.current.phi    = Math.max(-PHI_LIMIT, Math.min(PHI_LIMIT,
        orbitCurrent.current.phi + e.movementY * sensitivity
      ));
    };

    const onMouseDown = () => { mouseDeltaRef.current = 0; };

    const onPointerLockChange = () => {
      canvas.style.cursor = document.pointerLockElement === canvas ? "none" : "pointer";
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
    };
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const targetT = expandedRef.current ? 1 : 0;

    morphT.current += (targetT - morphT.current) * 0.045;
    const ease = easeInOut(morphT.current);

    // Orbit camera around origin using accumulated spherical coords
    const theta = orbitCurrent.current.theta;
    const phi   = orbitCurrent.current.phi;
    camera.position.set(
      BASE_RADIUS * Math.sin(theta) * Math.cos(phi),
      BASE_RADIUS * Math.sin(phi),
      BASE_RADIUS * Math.cos(theta) * Math.cos(phi),
    );
    camera.lookAt(0, 0, 0);

    // Animate stars (constellation stays at world origin, no group rotation)
    STARS.forEach((star, i) => {
      const pos = lerpPos(star.posArc, star.posLine, ease);
      posRefsRef.current[i] = pos;

      const refs = meshRefs.current[i];
      if (refs.group) refs.group.position.set(pos[0], pos[1], pos[2]);

      const isSelected = selectedId === star.id;
      const anySelected = !!selectedId;
      const pulse = 1 + Math.sin(t * 1.6 + star.id.charCodeAt(0) * 0.7) * 0.07;

      if (refs.mesh) {
        refs.mesh.scale.setScalar(isSelected ? pulse * 1.55 : pulse);
        refs.mesh.material.emissiveIntensity = isSelected
          ? 3.5 + Math.sin(t * 2) * 0.5
          : anySelected ? 1.0
          : 1.8 + Math.sin(t * 1.6 + star.id.charCodeAt(0)) * 0.3;
        refs.mesh.material.opacity = anySelected && !isSelected ? 0.5 : 1;
      }
      if (refs.light) refs.light.intensity = isSelected ? 1.4 : 0.55;
    });
  });

  return (
    <>
      <ambientLight intensity={0.04} />
      <ColorStarfield />
      <MilkyWay />

      {/* Constellation is stationary — no rotation group needed */}
      <ConstellationLines rotGroupRef={{ current: null }} posRefsRef={posRefsRef} />

      {STARS.map((star, i) => (
        <group
          key={star.id}
          position={star.posArc}
          ref={el => { meshRefs.current[i].group = el; }}
        >
          <pointLight
            ref={el => { meshRefs.current[i].light = el; }}
            color={star.color} intensity={0.55} distance={1.8} decay={2}
          />
          <mesh
            ref={el => { meshRefs.current[i].mesh = el; }}
            onClick={(e) => {
                e.stopPropagation();
                // Ignore if the mouse moved significantly (was a drag, not a click)
                if (mouseDeltaRef.current > 6) return;
                onSelect(selectedId === star.id ? null : star.id);
              }}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
            onPointerLeave={() => { document.body.style.cursor = "auto"; }}
          >
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial
              color={star.color} emissive={star.color}
              emissiveIntensity={1.8} roughness={0} metalness={0} transparent
            />
          </mesh>

            {/* Star name label */}
            <Html
              position={[0, 0.22, 0]}
              center
              distanceFactor={8}
              zIndexRange={[10, 0]}
              style={{ pointerEvents: "none" }}
            >
              <div style={{
                fontFamily: "monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: selectedId && selectedId !== star.id
                  ? "rgba(180,160,100,0.2)"
                  : "rgba(180,160,100,0.85)",
                whiteSpace: "nowrap",
                userSelect: "none",
                padding: "3px 8px",
                borderRadius: "20px",
                background: selectedId && selectedId !== star.id
                  ? "rgba(4,6,18,0.35)"
                  : "rgba(4,6,18,0.6)",
                backdropFilter: "blur(4px)",
                border: `1px solid ${selectedId && selectedId !== star.id ? "rgba(180,160,100,0.06)" : "rgba(180,160,100,0.18)"}`,
                transition: "color 0.4s ease, background 0.4s ease, border-color 0.4s ease",
              }}>
                {star.name}
              </div>
            </Html>
          </group>
        ))}
    </>
  );
}

// ─── Content panel ────────────────────────────────────────────────────────────
function ContentPanel({ star, onClose }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "48px 52px 40px", fontFamily: "'Crimson Text', serif",
      color: "#e8d9b0", overflowY: "auto",
    }}>
      {/* Back */}
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-start", background: "none",
          border: "1px solid rgba(180,160,100,0.25)", color: "rgba(180,160,100,0.55)",
          fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
          fontFamily: "monospace", padding: "6px 14px", borderRadius: "3px",
          cursor: "pointer", marginBottom: "48px", transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.target.style.borderColor = "rgba(180,160,100,0.6)"; e.target.style.color = "rgba(180,160,100,0.9)"; }}
        onMouseLeave={e => { e.target.style.borderColor = "rgba(180,160,100,0.25)"; e.target.style.color = "rgba(180,160,100,0.55)"; }}
      >← back</button>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "10px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: star.color, boxShadow: `0 0 12px ${star.color}`, flexShrink: 0, marginBottom: "20px" }} />
        <div>
          <p style={{ margin: "0 0 2px", fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: "monospace", color: "rgba(180,160,100,0.45)" }}>
            {star.role}
          </p>
          <h1 style={{ margin: 0, fontSize: "3.2rem", fontWeight: 600, letterSpacing: "0.02em", color: star.color, lineHeight: 1 }}>
            {star.name}
          </h1>
        </div>
      </div>

      {/* Accent line */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, ${star.color}55, transparent)`, marginBottom: "28px", marginTop: "16px" }} />

      {/* Intro paragraph */}
      <p style={{ margin: "0 0 36px", fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(220,210,190,0.85)", maxWidth: "580px" }}>
        {star.intro}
      </p>

      {/* Highlights grid */}
      <p style={{ margin: "0 0 14px", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", color: "rgba(180,160,100,0.4)" }}>
        {star.tags.length > 0 && "What I focus on"}
        {star.tags.length == 0 && "Contact Me"}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "36px" }}>
        {star.highlights.map((h) => (
          <div key={h} style={{
            padding: "12px 16px",
            background: `${star.color}0d`,
            border: `1px solid ${star.color}30`,
            borderRadius: "6px",
            fontSize: "0.88rem",
            color: "rgba(220,210,190,0.8)",
          }}>{h}</div>
        ))}
      </div>

      {/* Personal note */}
      <div style={{
        padding: "20px 22px",
        background: "rgba(180,160,100,0.04)",
        border: "1px solid rgba(180,160,100,0.1)",
        borderLeft: `3px solid ${star.color}66`,
        borderRadius: "0 6px 6px 0",
        marginBottom: "36px",
      }}>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.75, fontStyle: "italic", color: "rgba(210,200,180,0.7)" }}>
          "{star.note}"
        </p>
      </div>

      {/* Tags */}
      {star.tags.length > 0 && 
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", color: "rgba(180,160,100,0.4)" }}>
          Tools & skills
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "auto" }}>
          {star.tags.map(tag => (
            <span key={tag} style={{
              padding: "4px 12px",
              background: "rgba(180,160,100,0.07)",
              border: "1px solid rgba(180,160,100,0.18)",
              borderRadius: "20px",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              fontFamily: "monospace",
              color: "rgba(180,160,100,0.6)",
            }}>{tag}</span>
          ))}
        </div>
      </div>
      }

      {/* Footer */}
      <div style={{ paddingTop: "32px", marginTop: "32px", borderTop: "1px solid rgba(180,160,100,0.08)", display: "flex", gap: "12px" }}>
        <div style={{
          flex: 1, padding: "13px 0", textAlign: "center",
          background: `${star.color}15`, border: `1px solid ${star.color}40`,
          borderRadius: "5px", fontSize: "0.62rem", letterSpacing: "0.18em",
          textTransform: "uppercase", fontFamily: "monospace", color: star.color, cursor: "default",
        }}>View Work</div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Constellation() {
  const [selectedId, setSelectedId] = useState(null);
  const [visibleId, setVisibleId] = useState(null);
  const expandedRef = useRef(false);

  const canvasContainerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const rafRef = useRef(null);
  const isTransitioning = useRef(false);

  const measureCanvas = useCallback(() => {
    const el = canvasContainerRef.current;
    if (!el) return;
    const { clientWidth: width, clientHeight: height } = el;
    setCanvasSize(prev =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );
  }, []);

  const startTransitionPoll = useCallback(() => {
    isTransitioning.current = true;
    const poll = () => {
      measureCanvas();
      if (isTransitioning.current) rafRef.current = requestAnimationFrame(poll);
    };
    rafRef.current = requestAnimationFrame(poll);
    setTimeout(() => {
      isTransitioning.current = false;
      cancelAnimationFrame(rafRef.current);
      measureCanvas();
    }, 750);
  }, [measureCanvas]);

  useEffect(() => {
    measureCanvas();
    const ro = new ResizeObserver(measureCanvas);
    if (canvasContainerRef.current) ro.observe(canvasContainerRef.current);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [measureCanvas]);

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
    expandedRef.current = !!id;
    startTransitionPoll();
    // Release pointer lock when panel opens or closes
    if (document.pointerLockElement) document.exitPointerLock();
    if (id) {
      setVisibleId(id);
    } else {
      setTimeout(() => setVisibleId(null), 600);
    }
  }, [startTransitionPoll]);

  const expanded = !!selectedId;
  const selectedStar = STARS.find(s => s.id === visibleId);

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh", overflow: "hidden",
      background: "radial-gradient(ellipse at 45% 48%, #0b0f2a 0%, #060910 55%, #020407 100%)",
      fontFamily: "'Crimson Text', serif", display: "flex",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* ── Left: content panel (80%) ── */}
      <div style={{
        width: expanded ? "80%" : "0%", minWidth: 0, overflow: "hidden",
        transition: "width 0.65s cubic-bezier(0.65, 0, 0.35, 1)",
        position: "relative", zIndex: 10,
        borderRight: expanded ? "1px solid rgba(180,160,100,0.08)" : "none",
      }}>
        {selectedStar && (
          <div style={{
            width: "100%", height: "100%",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s",
          }}>
            <ContentPanel star={selectedStar} onClose={() => handleSelect(null)} />
          </div>
        )}
      </div>

      {/* ── Right: canvas (20% when expanded) ── */}
      <div ref={canvasContainerRef} style={{ flex: 1, position: "relative" }}>

        {/* Header */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          display: "flex", padding: "24px", pointerEvents: "none",
          opacity: expanded ? 0 : 1, transition: "opacity 0.3s ease",
        }}>
          <div>
            <h1 style={{ color: "#e8d9b0", fontSize: "1.4rem", letterSpacing: "0.1em", margin: 0, fontWeight: 600 }}>
              Logan Williams
            </h1>
            <p style={{ color: "rgba(180,160,100,0.4)", fontSize: "0.6rem", letterSpacing: "0.24em", margin: "3px 0 0", textTransform: "uppercase", fontFamily: "monospace" }}>
              Engineer · Curious Person · Nerd
            </p>
          </div>
        </div>

        {/* Hint */}
        {!expanded && (
          <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none", textAlign: "center" }}>
            <p style={{ backgroundColor: "rgba(4,6,18,0.6)",color: "rgba(180,160,100,1)", fontSize: "0.6rem", letterSpacing: "0.24em", fontFamily: "monospace", textTransform: "uppercase", whiteSpace: "nowrap", margin: "0 0 4px" }}>
              ✦ click to look around · click a star to explore
            </p>
            <p style={{ color: "rgba(180,160,100,0.5)", fontSize: "0.55rem", letterSpacing: "0.2em", fontFamily: "monospace", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>
              esc to release mouse
            </p>
          </div>
        )}

        {/* Selected star label in sidebar */}
        {expanded && selectedStar && (
          <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none", textAlign: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: selectedStar.color, margin: "0 auto 8px", boxShadow: `0 0 8px ${selectedStar.color}` }} />
            <p style={{ color: "rgba(180,160,100,0.35)", fontSize: "0.55rem", letterSpacing: "0.22em", fontFamily: "monospace", textTransform: "uppercase", margin: 0 }}>
              {selectedStar.name}
            </p>
          </div>
        )}

        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          style={{ position: "absolute", top: 0, left: 0, width: canvasSize.width || "100%", height: canvasSize.height || "100%" }}
          resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
          onPointerMissed={(e) => {
            const canvas = e.target.closest("canvas") || document.querySelector("canvas");
            if (canvas && !expandedRef.current && (canvasSize.width || window.innerWidth) > 300) {
              // Toggle: lock if unlocked, unlock if locked
              if (document.pointerLockElement === canvas) {
                document.exitPointerLock();
              } else {
                canvas.requestPointerLock();
              }
            }
            handleSelect(null);
          }}
        >
          <Scene selectedId={selectedId} expandedRef={expandedRef} onSelect={handleSelect} canvasSize={canvasSize} />
        </Canvas>

        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 45%, rgba(2,4,14,0.75) 100%)" }} />
        {expanded && (
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "60px", pointerEvents: "none", background: "linear-gradient(90deg, rgba(6,9,16,0.6), transparent)" }} />
        )}
      </div>
    </div>
  );
}
