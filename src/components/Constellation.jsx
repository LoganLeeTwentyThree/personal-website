import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Star content (category overview pages) ───────────────────────────────────
import GameDesign  from "./stars/GameDesign";
import Engineering from "./stars/Engineering";
import Philosophy  from "./stars/Philosophy";
import MTG         from "./stars/MTG";
import Contact     from "./stars/Contact";

// ─── Planet content (sub-articles) ───────────────────────────────────────────
import Ethics from "./stars/Ethics";
import Consciousness from "./stars/Consciousness"
import Layers from "./stars/Layers"
import Reality from "./stars/Reality"
import FreeWill from "./stars/FreeWill"

// ═════════════════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════════════════

const STARS = [
  { id: "game_design",  name: "Game Design",          color: "#ffb877", pos: [-2.8,  1.4,  0.3], component: GameDesign  },
  { id: "engineering",  name: "Software Engineering", color: "#97d0f9", pos: [-1.1, -0.8, -0.2], component: Engineering },
  { id: "philosophy",   name: "Philosophy",           color: "#faa27f", pos: [ 0.3,  1.1,  0.4], component: Philosophy  },
  { id: "mtg",          name: "Magic: The Gathering", color: "#aad4ff", pos: [ 1.6, -0.7, -0.3], component: MTG         },
  { id: "contact",      name: "Contact",              color: "#ffd0a0", pos: [ 2.8,  0.6,  0.1], component: Contact     },
];

// Each planet orbits its parent star. radius/speed/phase define the orbit.
// tilt slightly randomises which plane the orbit sits on (radians).
const PLANETS = [
  { id: "consciousness", parentId: "philosophy",  name: "Consciousness", color: "#7884eb", radius: 0.8, speed: 0.08, phase: 0.0,  tilt: 0.15, component: Consciousness },
  { id: "ethics", parentId: "philosophy",  name: "Ethics", color: "#78eb91",               radius: 1.5, speed: 0.009, phase: 0.0,  tilt: -0.15, component: Ethics },
  { id: "layers", parentId: "philosophy",  name: "Layers", color: "#eb78ae",               radius: 2, speed: 0.02, phase: 0.0,  tilt: .3, component: Layers },
  { id: "reality", parentId: "philosophy",  name: "Reality", color: "#78ebeb",             radius: 2.3, speed: 0.05, phase: 0.0,  tilt: 0, component: Reality },
  { id: "freewill", parentId: "philosophy",  name: "Free Will", color: "#daeb78",          radius: 2.5, speed: 0.07, phase: 0.0,  tilt: 0, component: FreeWill },

  // Add more planets here — just copy the line above and change the values:
  // { id: "game_jam", parentId: "game_design", name: "Game Jam", color: "#f5c98a", radius: 0.9, speed: 0.10, phase: 1.2, tilt: 0.1, component: GameJam },
];

const CONNECTIONS = [
  ["game_design", "engineering"],
  ["engineering", "philosophy"],
  ["philosophy",  "mtg"],
  ["mtg",         "contact"],
];

// Camera distances
const ORBIT_RADIUS  = 6.5;   // constellation view
const SOLAR_DIST    = 3.2;   // how close we zoom to a star in solar view
const ZOOM_SPEED    = 0.04;  // lerp factor per frame

// ═════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═════════════════════════════════════════════════════════════════════════════
function easeInOut(t) {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
}
function lerpV3(a, b, t) {
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t,
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CIRCLE TEXTURE
// ═════════════════════════════════════════════════════════════════════════════
function makeCircleTexture(size = 64) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const r = size / 2;
  const g = ctx.createRadialGradient(r,r,0,r,r,r);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.8)");
  g.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

// ═════════════════════════════════════════════════════════════════════════════
// BACKGROUND STARFIELD
// ═════════════════════════════════════════════════════════════════════════════
function ColorStarfield() {
  const { scene } = useThree();
  useEffect(() => {
    const sprite = makeCircleTexture(64);
    const COUNT = 9000;
    const pos = new Float32Array(COUNT * 3), col = new Float32Array(COUNT * 3);
    const palette = [
      "#ffffff","#ffffff","#ffffff","#88bbff","#ffcc55",
      "#ff88aa","#55eecc","#cc99ff","#ff9955","#aaddff",
    ].map(h => new THREE.Color(h));
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random()*Math.PI*2, phi = Math.acos(2*Math.random()-1), r = 60+Math.random()*40;
      pos[i*3]   = r*Math.sin(phi)*Math.cos(theta);
      pos[i*3+1] = r*Math.sin(phi)*Math.sin(theta);
      pos[i*3+2] = r*Math.cos(phi);
      const base = palette[Math.floor(Math.random()*palette.length)], bl = 0.05+Math.random()*0.15;
      col[i*3]   = Math.min(1, base.r*(1-bl)+bl);
      col[i*3+1] = Math.min(1, base.g*(1-bl)+bl);
      col[i*3+2] = Math.min(1, base.b*(1-bl)+bl);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.55, map: sprite, vertexColors: true, transparent: true, opacity: 0.9, alphaTest: 0.01, sizeAttenuation: true, depthWrite: false });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return () => { scene.remove(pts); geo.dispose(); mat.dispose(); sprite.dispose(); };
  }, [scene]);
  return null;
}

// ═════════════════════════════════════════════════════════════════════════════
// MILKY WAY
// ═════════════════════════════════════════════════════════════════════════════
function MilkyWay() {
  const { scene } = useThree();
  useEffect(() => {
    const objs = [], sprite = makeCircleTexture(64);
    const tilt = new THREE.Matrix4().makeRotationX(0.45).multiply(new THREE.Matrix4().makeRotationZ(0.3));
    const g3 = () => Math.random()+Math.random()+Math.random()-1.5;
    const layer = (n, bw, r0, r1, cfn, sz, op, bl = THREE.AdditiveBlending) => {
      const p = new Float32Array(n*3), c = new Float32Array(n*3);
      for (let i=0;i<n;i++) {
        const a=Math.random()*Math.PI*2, gv=g3(), o=gv*bw, r=r0+Math.random()*(r1-r0);
        const v = new THREE.Vector3(r*Math.cos(a)*Math.cos(o),r*Math.sin(o),r*Math.sin(a)*Math.cos(o)).applyMatrix4(tilt);
        p[i*3]=v.x;p[i*3+1]=v.y;p[i*3+2]=v.z;
        const col=cfn(Math.abs(gv)); c[i*3]=col.r;c[i*3+1]=col.g;c[i*3+2]=col.b;
      }
      const geo=new THREE.BufferGeometry();
      geo.setAttribute("position",new THREE.BufferAttribute(p,3));
      geo.setAttribute("color",   new THREE.BufferAttribute(c,3));
      const mat=new THREE.PointsMaterial({size:sz,map:sprite,vertexColors:true,transparent:true,opacity:op,alphaTest:0.01,sizeAttenuation:true,depthWrite:false,blending:bl});
      const pts=new THREE.Points(geo,mat); scene.add(pts); objs.push({pts,geo,mat});
    };
    layer(28000,0.32,70,85,nd=>new THREE.Color("#ffe8c0").lerp(new THREE.Color("#b0b8c8"),Math.min(1,nd*1.2)).multiplyScalar(Math.exp(-nd*nd*1.4)*(0.65+Math.random()*0.35)),0.4,0.85);
    layer(8000,0.10,71,81,nd=>new THREE.Color("#fff5e0").multiplyScalar(Math.exp(-nd*nd*2.5)*(0.7+Math.random()*0.3)),0.45,0.95);
    layer(1800,0.06,71,80,()=>new THREE.Color("#080408").multiplyScalar(0.85+Math.random()*0.15),4.5,0.28,THREE.NormalBlending);
    layer(900,0.04,72,80,()=>new THREE.Color("#0a0508").multiplyScalar(0.9+Math.random()*0.1),3.0,0.20,THREE.NormalBlending);
    return ()=>{ objs.forEach(({pts,geo,mat})=>{scene.remove(pts);geo.dispose();mat.dispose();}); sprite.dispose(); };
  },[scene]);
  return null;
}

// ═════════════════════════════════════════════════════════════════════════════
// CONSTELLATION LINES (main star backbone only)
// ═════════════════════════════════════════════════════════════════════════════
function ConstellationLines({ visibilityRef }) {
  const { scene } = useThree();
  const linesRef = useRef([]);

  useEffect(() => {
    const group = new THREE.Group();
    scene.add(group);
    const lines = CONNECTIONS.map(([a, b]) => {
      const sa = STARS.find(s => s.id === a), sb = STARS.find(s => s.id === b);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(
        new Float32Array([...sa.pos, ...sb.pos]), 3
      ));
      const mat = new THREE.LineBasicMaterial({ color: "#c8a84b", transparent: true, opacity: 0.55, depthTest: false });
      const line = new THREE.Line(geo, mat);
      group.add(line);
      return { line, mat };
    });
    linesRef.current = lines;
    return () => { lines.forEach(({line}) => { line.geometry.dispose(); line.material.dispose(); }); scene.remove(group); };
  }, [scene]);

  useFrame(() => {
    // Fade lines out when zoomed into a star
    const v = visibilityRef.current;
    linesRef.current.forEach(({ mat }) => { mat.opacity = 0.55 * v; });
  });

  return null;
}

// ═════════════════════════════════════════════════════════════════════════════
// ORBIT RING (shown around the sun in solar view)
// ═════════════════════════════════════════════════════════════════════════════
function OrbitRing({ planet, starPos }) {
  const { scene } = useThree();
  useEffect(() => {
    const pts = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      // Flat X/Z ring — matches the planet's actual orbit plane
      pts.push(new THREE.Vector3(
        starPos[0] + Math.cos(a) * planet.radius,
        starPos[1],
        starPos[2] + Math.sin(a) * planet.radius,
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: planet.color, transparent: true, opacity: 0.2, depthTest: false });
    const ring = new THREE.Line(geo, mat);
    scene.add(ring);
    return () => { geo.dispose(); mat.dispose(); scene.remove(ring); };
  }, [scene, planet, starPos]);
  return null;
}


function Scene({ mode, zoomedStarId, selectedPlanetId, onSelectStar, onSelectPlanet, onSelectZoomedStar, onBack,
                 orbitRef, isMobileRef, wasDraggingRef }) {

  const { camera } = useThree();

  // Camera animation state
  const zoomT        = useRef(0);
  const orbitCamPos  = useRef(new THREE.Vector3(0, 0, ORBIT_RADIUS));
  const targetCamPos = useRef(new THREE.Vector3(0, 0, ORBIT_RADIUS));
  const targetLook   = useRef(new THREE.Vector3(0, 0, 0));
  const visRef       = useRef(1);

  // Keep a ref of selectedPlanetId so useFrame always sees the latest value
  const selectedPlanetIdRef = useRef(selectedPlanetId);
  useEffect(() => { selectedPlanetIdRef.current = selectedPlanetId; }, [selectedPlanetId]);

  // When switching back to star view (planet deselected), restore star target
  const zoomedStarIdRef = useRef(zoomedStarId);
  useEffect(() => { zoomedStarIdRef.current = zoomedStarId; }, [zoomedStarId]);

  // Mesh refs
  const starMeshRefs    = useRef(STARS.map(() => ({ mesh: null, light: null })));
  const planetGroupRefs = useRef(PLANETS.map(() => null));
  const planetMeshRefs  = useRef(PLANETS.map(() => null));
  // Track actual rendered opacity per planet so labels can read it
  // DOM refs for planet label divs — written directly by useFrame
  const planetLabelRefs = useRef(PLANETS.map(() => null));

  const PHI_LIMIT = Math.PI / 2 - 0.05;

  // Update base solar target when star changes (planet tracking overrides this per-frame)
  useEffect(() => {
    if (mode === "constellation") {
      targetLook.current.set(0, 0, 0);
    } else {
      const star = STARS.find(s => s.id === zoomedStarId);
      if (!star) return;
      const sp = new THREE.Vector3(...star.pos);
      targetCamPos.current.copy(sp).add(new THREE.Vector3(0, 3.5, 3.5));
      targetLook.current.copy(sp);
    }
  }, [mode, zoomedStarId]);

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime();
    const mob = isMobileRef.current;

    // ── Camera ──────────────────────────────────────────────────────────────
    if (mode === "constellation") {
      zoomT.current = Math.max(0, zoomT.current - ZOOM_SPEED);
      if (!mob) {
        const { theta, phi } = orbitRef.current;
        orbitCamPos.current.set(
          ORBIT_RADIUS * Math.sin(theta) * Math.cos(phi),
          ORBIT_RADIUS * Math.sin(phi),
          ORBIT_RADIUS * Math.cos(theta) * Math.cos(phi),
        );
      }
      camera.position.lerp(mob ? new THREE.Vector3(0, 0.3, 9.5) : orbitCamPos.current, 0.08);
      camera.lookAt(0, 0, 0);
    } else {
      zoomT.current = Math.min(1, zoomT.current + ZOOM_SPEED);

      // If a planet is selected, track its current orbiting position
      const activePlanetId = selectedPlanetIdRef.current;
      if (activePlanetId) {
        const pi = PLANETS.findIndex(p => p.id === activePlanetId);
        if (pi >= 0) {
          const planet  = PLANETS[pi];
          const starPos = STARS.find(s => s.id === planet.parentId).pos;
          const angle   = t * planet.speed + planet.phase;
          const px = starPos[0] + Math.cos(angle) * planet.radius;
          const py = starPos[1];
          const pz = starPos[2] + Math.sin(angle) * planet.radius;
          // Isometric offset above/behind the planet
          targetCamPos.current.set(px, py + 2.2, pz + 2.2);
          targetLook.current.set(px, py, pz);
        }
      } else {
        // No planet selected — look at the star
        const star = STARS.find(s => s.id === zoomedStarIdRef.current);
        if (star) {
          const sp = new THREE.Vector3(...star.pos);
          targetCamPos.current.lerp(sp.clone().add(new THREE.Vector3(0, 3.5, 3.5)), 0.04);
          targetLook.current.lerp(sp, 0.04);
        }
      }

      camera.position.lerp(targetCamPos.current, 0.06);
      camera.lookAt(targetLook.current);
    }

    const ease = easeInOut(zoomT.current);
    visRef.current = 1 - ease;           // constellation fades as we zoom in

    // ── Main stars ──────────────────────────────────────────────────────────
    STARS.forEach((star, i) => {
      const refs = starMeshRefs.current[i];
      if (!refs.mesh) return;
      const isZoomed  = star.id === zoomedStarId;
      const inSolar   = mode !== "constellation";
      // In solar mode: the zoomed star glows fully, others fade
      const targetOpacity = inSolar ? (isZoomed ? 1 : 0) : 1;
      const targetEmit    = inSolar ? (isZoomed ? 4.5 + Math.sin(t*1.5)*0.5 : 0)
                                     : (1.8 + Math.sin(t * 1.6 + star.id.charCodeAt(0)) * 0.3);
      const targetScale   = inSolar ? (isZoomed ? 1.6 : 0) : (1 + Math.sin(t*1.6 + i)*0.07);

      refs.mesh.material.opacity          += (targetOpacity - refs.mesh.material.opacity) * 0.06;
      refs.mesh.material.emissiveIntensity += (targetEmit - refs.mesh.material.emissiveIntensity) * 0.06;
      refs.mesh.scale.setScalar(refs.mesh.scale.x + (targetScale - refs.mesh.scale.x) * 0.06);
      if (refs.light) {
        refs.light.intensity += ((inSolar && isZoomed ? 2.5 : inSolar ? 0 : 0.55) - refs.light.intensity) * 0.06;
      }
    });

    // ── Planets (orbit around their parent star) ─────────────────────────────
    PLANETS.forEach((planet, pi) => {
      const pGroup = planetGroupRefs.current[pi];
      const pMesh  = planetMeshRefs.current[pi];
      if (!pGroup || !pMesh) return;

      const isActiveParent = planet.parentId === zoomedStarId && mode !== "constellation";
      const targetPlanetOpacity = isActiveParent ? 0.9 : 0;
      const targetPlanetEmit    = selectedPlanetId === planet.id
        ? 3.2 + Math.sin(t*2)*0.4
        : isActiveParent ? 1.0 + Math.sin(t*1.2 + pi)*0.2 : 0;

      pMesh.material.opacity          += (targetPlanetOpacity - pMesh.material.opacity) * 0.05;
      pMesh.material.emissiveIntensity += (targetPlanetEmit    - pMesh.material.emissiveIntensity) * 0.05;
      // Write label visibility directly to DOM — useFrame doesn't run inside Html portals
      const currentOp = pMesh.material.opacity;
      const labelEl = planetLabelRefs.current[pi];
      if (labelEl) {
        labelEl.style.opacity = String(Math.min(1, currentOp * 1.1));
        labelEl.style.color = selectedPlanetId === planet.id
          ? "rgba(255,240,210,0.95)" : "rgba(180,160,100,0.65)";
      }

      // Flat X/Z orbit — matches the ring geometry exactly
      const angle   = t * planet.speed + planet.phase;
      const starPos = STARS.find(s => s.id === planet.parentId).pos;
      pGroup.position.set(
        starPos[0] + Math.cos(angle) * planet.radius,
        starPos[1],
        starPos[2] + Math.sin(angle) * planet.radius,
      );
    });
  });

  const handleStarClick = (starId) => (e) => {
    e.stopPropagation();
    if (wasDraggingRef.current) return;
    if (mode === "constellation") {
      onSelectStar(starId);
    } else if (zoomedStarId === starId) {
      // In solar mode: clicking the sun opens/closes the star's own panel
      onSelectZoomedStar(starId);
    }
  };

  const handlePlanetClick = (planetId) => (e) => {
    e.stopPropagation();
    if (wasDraggingRef.current) return;
    onSelectPlanet(planetId === selectedPlanetId ? null : planetId);
  };

  const hoverOn  = (e) => { e.stopPropagation(); if (!isMobileRef.current) document.body.style.cursor = "pointer"; };
  const hoverOff = ()  => { if (!isMobileRef.current) document.body.style.cursor = "auto"; };

  const activePlanets = PLANETS.filter(p => p.parentId === zoomedStarId);

  return (
    <>
      <ambientLight intensity={0.04} />
      <ColorStarfield />
      <MilkyWay />
      <ConstellationLines visibilityRef={visRef} />

      {/* ── Orbit rings (shown in solar mode) ── */}
      {mode !== "constellation" && activePlanets.map(planet => {
        const star = STARS.find(s => s.id === planet.parentId);
        return <OrbitRing key={planet.id} planet={planet} starPos={star.pos} />;
      })}

      {/* ── Main stars ── */}
      {STARS.map((star, i) => (
        <group key={star.id} position={star.pos}>
          <pointLight
            ref={el => { starMeshRefs.current[i].light = el; }}
            color={star.color} intensity={0.55} distance={2.5} decay={2}
          />
          <mesh
            ref={el => { starMeshRefs.current[i].mesh = el; }}
            onClick={handleStarClick(star.id)}
            onPointerEnter={hoverOn}
            onPointerLeave={hoverOff}
          >
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color={star.color} emissive={star.color} emissiveIntensity={1.8} roughness={0} metalness={0} transparent />
          </mesh>
          {/* Hit zone */}
          <mesh onClick={handleStarClick(star.id)}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <Html position={[0, 0.28, 0]} center distanceFactor={8} zIndexRange={[10,0]} style={{ pointerEvents:"none" }}>
            <div style={{
              fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.18em",
              textTransform:"uppercase", whiteSpace:"nowrap", userSelect:"none",
              padding:"3px 8px", borderRadius:"20px", backdropFilter:"blur(4px)",
              opacity: mode !== "constellation" && zoomedStarId !== star.id ? 0 : 1,
              color:"rgba(180,160,100,0.85)",
              background:"rgba(4,6,18,0.6)",
              border:"1px solid rgba(180,160,100,0.18)",
              transition:"opacity 0.5s ease",
            }}>{star.name}</div>
          </Html>
        </group>
      ))}

      {/* ── Planets ── */}
      {PLANETS.map((planet, pi) => (
        <group
          key={planet.id}
          ref={el => { planetGroupRefs.current[pi] = el; }}
          position={STARS.find(s => s.id === planet.parentId).pos}
        >
          <mesh
            ref={el => { planetMeshRefs.current[pi] = el; }}
            onClick={handlePlanetClick(planet.id)}
            onPointerEnter={hoverOn}
            onPointerLeave={hoverOff}
          >
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={planet.color} emissive={planet.color} emissiveIntensity={0} roughness={0.1} metalness={0} transparent opacity={0} />
          </mesh>
          {/* Hit zone */}
          <mesh onClick={handlePlanetClick(planet.id)}>
            <sphereGeometry args={[0.28, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          {/* Label — opacity written directly by Scene's useFrame */}
          <Html position={[0, 0.2, 0]} center distanceFactor={8} zIndexRange={[10,0]} style={{ pointerEvents:"none" }}>
            <div
              ref={el => { planetLabelRefs.current[pi] = el; }}
              style={{
                fontFamily:"monospace", fontSize:"0.50rem", letterSpacing:"0.15em",
                textTransform:"uppercase", whiteSpace:"nowrap", userSelect:"none",
                padding:"2px 7px", borderRadius:"20px", backdropFilter:"blur(4px)",
                color:"rgba(180,160,100,0.65)",
                background:"rgba(4,6,18,0.55)",
                border:`1px solid ${planet.color}44`,
                opacity: 0,
              }}
            >{planet.name}</div>
          </Html>
        </group>
      ))}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTENT PANEL
// ═════════════════════════════════════════════════════════════════════════════
function ContentPanel({ item, onClose }) {
  const C = item.component;
  return <C onClose={onClose} />;
}

// ═════════════════════════════════════════════════════════════════════════════
// ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function Constellation() {
  // mode: "constellation" | "solar"
  const [mode,            setMode]           = useState("constellation");
  const [zoomedStarId,    setZoomedStarId]   = useState(null);
  const [selectedPlanetId,setSelectedPlanetId] = useState(null);
  const [visiblePlanetId, setVisiblePlanetId]  = useState(null);
  const [selectedStarId,  setSelectedStarId]   = useState(null); // star panel in solar mode
  const [visibleStarId,   setVisibleStarId]    = useState(null);

  // Panel is open if either a planet or a star is selected
  const panelOpen = !!selectedPlanetId || !!selectedStarId;

  const isMobileRef    = useRef(window.innerWidth <= 768);
  const orbitRef       = useRef({ theta: 0, phi: 0 });
  const wasDraggingRef = useRef(false);
  const dragRef        = useRef({ active:false, lastX:0, lastY:0, totalDelta:0 });

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => { const m = window.innerWidth<=768; isMobileRef.current=m; setIsMobile(m); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const PHI_LIMIT = Math.PI/2 - 0.05;
  const SENS      = 0.006;

  const onDragStart = useCallback((e) => {
    if (isMobileRef.current || mode !== "constellation") return;
    dragRef.current = { active:true, lastX:e.clientX, lastY:e.clientY, totalDelta:0 };
    wasDraggingRef.current = false;
  }, [mode]);

  const onDragMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX, dy = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX; dragRef.current.lastY = e.clientY;
    dragRef.current.totalDelta += Math.abs(dx)+Math.abs(dy);
    if (dragRef.current.totalDelta > 6) wasDraggingRef.current = true;
    orbitRef.current.theta -= dx * SENS;
    orbitRef.current.phi    = Math.max(-PHI_LIMIT, Math.min(PHI_LIMIT, orbitRef.current.phi + dy*SENS));
  }, []);

  const onDragEnd = useCallback(() => {
    dragRef.current.active = false;
    setTimeout(() => { wasDraggingRef.current = false; }, 0);
  }, []);

  // ── Selection handlers ───────────────────────────────────────────────────
  const handleSelectStar = useCallback((starId) => {
    setMode("solar");
    setZoomedStarId(starId);
    setSelectedPlanetId(null);
    setVisiblePlanetId(null);
    setSelectedStarId(null);
    setVisibleStarId(null);
  }, []);

  // Clicking the sun in solar mode opens/closes its panel
  const handleSelectZoomedStar = useCallback((starId) => {
    if (selectedStarId === starId) {
      setSelectedStarId(null);
      setTimeout(() => setVisibleStarId(null), 600);
    } else {
      setSelectedStarId(starId);
      setVisibleStarId(starId);
      setSelectedPlanetId(null);
      setTimeout(() => setVisiblePlanetId(null), 600);
    }
  }, [selectedStarId]);

  const handleSelectPlanet = useCallback((planetId) => {
    setSelectedPlanetId(planetId);
    if (planetId) {
      setVisiblePlanetId(planetId);
      setSelectedStarId(null);
      setTimeout(() => setVisibleStarId(null), 600);
    } else {
      setTimeout(() => setVisiblePlanetId(null), 600);
    }
  }, []);

  const handleBack = useCallback(() => {
    setMode("constellation");
    setZoomedStarId(null);
    setSelectedPlanetId(null);
    setSelectedStarId(null);
    setTimeout(() => { setVisiblePlanetId(null); setVisibleStarId(null); }, 600);
  }, []);

  const handlePointerMissed = useCallback(() => {
    if (wasDraggingRef.current) return;
    if (mode === "solar") {
      setSelectedPlanetId(null);
      setSelectedStarId(null);
      setTimeout(() => { setVisiblePlanetId(null); setVisibleStarId(null); }, 600);
    }
  }, [mode]);

  // ── Canvas sizing ────────────────────────────────────────────────────────
  const canvasRef  = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width:0, height:0 });
  const rafRef     = useRef(null);
  const transRef   = useRef(false);

  const measure = useCallback(() => {
    const el = canvasRef.current; if (!el) return;
    const { clientWidth:w, clientHeight:h } = el;
    setCanvasSize(p => p.width===w && p.height===h ? p : { width:w, height:h });
  }, []);

  const pollTransition = useCallback(() => {
    transRef.current = true;
    const poll = () => { measure(); if (transRef.current) rafRef.current = requestAnimationFrame(poll); };
    rafRef.current = requestAnimationFrame(poll);
    setTimeout(() => { transRef.current=false; cancelAnimationFrame(rafRef.current); measure(); }, 750);
  }, [measure]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [measure]);

  // Panel content: star takes priority over planet if both somehow set
  const visiblePlanet = PLANETS.find(p => p.id === visiblePlanetId);
  const visibleStar   = STARS.find(s => s.id === visibleStarId);

  return (
    <div style={{
      position:"relative", width:"100%", height:"100vh", overflow:"hidden",
      background:"radial-gradient(ellipse at 45% 48%, #0b0f2a 0%, #060910 55%, #020407 100%)",
      fontFamily:"'Crimson Text', serif", display:"flex",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        @media (max-width:768px) {
          .panel-wrap { position:absolute !important; top:0; left:0; width:100% !important; height:100%; z-index:20; }
        }
      `}</style>

      {/* ── Left panel (star overview or planet article) ── */}
      <div
        className="panel-wrap"
        style={{
          width: panelOpen ? "80%" : "0%", minWidth:0, overflow:"hidden",
          transition:"width 0.65s cubic-bezier(0.65,0,0.35,1)",
          position:"relative", zIndex:10,
          borderRight: panelOpen ? "1px solid rgba(180,160,100,0.08)" : "none",
        }}
      >
        {(visibleStar || visiblePlanet) && (
          <div style={{
            width:"100%", height:"100%",
            opacity: panelOpen ? 1 : 0,
            transform: panelOpen ? "translateX(0)" : "translateX(-24px)",
            transition:"opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s",
          }}>
            <ContentPanel
              item={visibleStar ?? visiblePlanet}
              onClose={() => visibleStar ? handleSelectZoomedStar(visibleStar.id) : handleSelectPlanet(null)}
            />
          </div>
        )}
      </div>

      {/* ── Canvas area ── */}
      <div
        ref={canvasRef}
        style={{ flex:1, position:"relative", touchAction: isMobile ? "auto" : "none" }}
        onPointerDown={isMobile ? undefined : onDragStart}
        onPointerMove={isMobile ? undefined : onDragMove}
        onPointerUp={isMobile ? undefined : onDragEnd}
        onPointerCancel={isMobile ? undefined : onDragEnd}
      >
        {/* Header */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, zIndex:10,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"24px", pointerEvents:"none",
          opacity: mode === "constellation" ? 1 : 0,
          transition:"opacity 0.4s ease",
        }}>
          <div>
            <h1 style={{ color:"#e8d9b0", fontSize:"1.4rem", letterSpacing:"0.1em", margin:0, fontWeight:600 }}>Logan Williams</h1>
            <p style={{ color:"rgba(180,160,100,0.4)", fontSize:"0.6rem", letterSpacing:"0.24em", margin:"3px 0 0", textTransform:"uppercase", fontFamily:"monospace" }}>
              Engineer · Curious Person · Nerd
            </p>
          </div>
        </div>

        {/* Solar mode header — star name + back button */}
        {mode === "solar" && (() => {
          const star = STARS.find(s => s.id === zoomedStarId);
          return (
            <div style={{
              position:"absolute", top:0, left:0, right:0, zIndex:10,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"20px 24px", pointerEvents:"auto",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: star?.color, boxShadow:`0 0 8px ${star?.color}` }} />
                <span style={{ color:"rgba(180,160,100,0.7)", fontSize:"0.6rem", letterSpacing:"0.24em", textTransform:"uppercase", fontFamily:"monospace" }}>
                  {star?.name}
                </span>
              </div>
              <button
                onClick={handleBack}
                style={{
                  background:"none", border:"1px solid rgba(180,160,100,0.25)", color:"rgba(180,160,100,0.55)",
                  fontSize:"0.6rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"monospace",
                  padding:"8px 16px", borderRadius:"3px", cursor:"pointer", transition:"all 0.2s",
                  WebkitTapHighlightColor:"transparent",
                }}
                onMouseEnter={e => { e.target.style.borderColor="rgba(180,160,100,0.6)"; e.target.style.color="rgba(180,160,100,0.9)"; }}
                onMouseLeave={e => { e.target.style.borderColor="rgba(180,160,100,0.25)"; e.target.style.color="rgba(180,160,100,0.55)"; }}
              >← constellation</button>
            </div>
          );
        })()}

        {/* Hint */}
        <div style={{
          position:"absolute", bottom:"28px", left:"50%", transform:"translateX(-50%)",
          zIndex:10, pointerEvents:"none", textAlign:"center",
          opacity: panelOpen ? 0 : 1, transition:"opacity 0.3s ease",
        }}>
          <p style={{
            background:"rgba(4,6,18,0.5)", borderRadius:"20px", padding:"4px 12px",
            color:"rgba(180,160,100,0.85)", fontSize:"0.6rem", letterSpacing:"0.2em",
            fontFamily:"monospace", textTransform:"uppercase", whiteSpace:"nowrap", margin:0,
          }}>
            {mode === "constellation"
              ? (isMobile ? "✦ tap a star to explore" : "✦ drag to look around · click a star to explore")
              : "✦ click a planet to read · ← to go back"}
          </p>
        </div>

        <Canvas
          camera={{ position:[0,0,ORBIT_RADIUS], fov:55 }}
          gl={{ antialias:true, alpha:false }}
          style={{ position:"absolute", top:0, left:0, width: canvasSize.width||"100%", height: canvasSize.height||"100%" }}
          resize={{ scroll:false, debounce:{ scroll:0, resize:0 } }}
          onPointerMissed={handlePointerMissed}
        >
          <Scene
            mode={mode}
            zoomedStarId={zoomedStarId}
            selectedPlanetId={selectedPlanetId}
            onSelectStar={handleSelectStar}
            onSelectPlanet={handleSelectPlanet}
            onSelectZoomedStar={handleSelectZoomedStar}
            onBack={handleBack}
            orbitRef={orbitRef}
            isMobileRef={isMobileRef}
            wasDraggingRef={wasDraggingRef}
          />
        </Canvas>

        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse at center, transparent 45%, rgba(2,4,14,0.75) 100%)" }} />
        {panelOpen && !isMobile && (
          <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"60px", pointerEvents:"none", background:"linear-gradient(90deg, rgba(6,9,16,0.6), transparent)" }} />
        )}
      </div>
    </div>
  );
}
