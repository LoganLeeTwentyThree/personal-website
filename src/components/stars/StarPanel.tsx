
export interface StarPanelProps {
  /** Accent color for this star (hex) */
  color: string;
  /** Star display name */
  name: string;
  /** Subtitle / role label */
  role: string;
  /** Called when the user hits ← back */
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Shared shell for every star content panel.
 * Provides the back button, glowing dot header, accent line, and scroll container.
 * Each star's .tsx file renders its custom content as children.
 */
export default function StarPanel({ color, name, role, onClose, children }: StarPanelProps) {
  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "clamp(24px, 5vw, 52px) clamp(20px, 5vw, 52px) 40px",
      fontFamily: "'Crimson Text', serif",
      color: "#e8d9b0",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      background: "radial-gradient(ellipse at 45% 48%, #0b0f2a 0%, #060910 55%, #020407 100%)",
    }}>
      {/* Back button */}
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "1px solid rgba(180,160,100,0.25)",
          color: "rgba(180,160,100,0.55)",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontFamily: "monospace",
          padding: "10px 18px",
          borderRadius: "3px",
          cursor: "pointer",
          marginBottom: "36px",
          transition: "all 0.2s",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.borderColor = "rgba(180,160,100,0.6)";
          (e.target as HTMLButtonElement).style.color = "rgba(180,160,100,0.9)";
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.borderColor = "rgba(180,160,100,0.25)";
          (e.target as HTMLButtonElement).style.color = "rgba(180,160,100,0.55)";
        }}
      >
        ← back
      </button>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "10px" }}>
        <div style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: color, boxShadow: `0 0 12px ${color}`,
          flexShrink: 0, marginBottom: "20px",
        }} />
        <div>
          <p style={{
            margin: "0 0 2px",
            fontSize: "0.6rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "rgba(180,160,100,0.45)",
          }}>
            {role}
          </p>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color,
            lineHeight: 1,
          }}>
            {name}
          </h1>
        </div>
      </div>

      {/* Accent line */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, ${color}55, transparent)`,
        marginBottom: "28px",
        marginTop: "16px",
      }} />

      {/* Star-specific content */}
      {children}
    </div>
  );
}

// ─── Convenience sub-components for star content ──────────────────────────────

export function Intro({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0 0 36px", fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(220,210,190,0.85)", maxWidth: "580px" }}>
      {children}
    </p>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0 0 14px", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", color: "rgba(180,160,100,0.4)" }}>
      {children}
    </p>
  );
}

export function HighlightGrid({ color, items }: { color: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "36px" }}>
      {items.map(h => (
        <div key={h} style={{
          padding: "12px 16px",
          background: `${color}0d`,
          border: `1px solid ${color}30`,
          borderRadius: "6px",
          fontSize: "0.88rem",
          color: "rgba(220,210,190,0.8)",
        }}>{h}</div>
      ))}
    </div>
  );
}

export function Callout({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: "20px 22px",
      background: "rgba(180,160,100,0.04)",
      border: "1px solid rgba(180,160,100,0.1)",
      borderLeft: `3px solid ${color}66`,
      borderRadius: "0 6px 6px 0",
      marginBottom: "36px",
    }}>
      <p style={{ margin: 0, fontSize: "1rem", fontStyle: "italic", color: "rgba(220,210,190,0.7)", lineHeight: 1.7 }}>
        "{children}"
      </p>
    </div>
  );
}

export function TagRow({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
      {tags.map(tag => (
        <span key={tag} style={{
          padding: "4px 10px", borderRadius: "3px",
          background: "rgba(180,160,100,0.06)",
          border: "1px solid rgba(180,160,100,0.15)",
          fontSize: "0.7rem", letterSpacing: "0.12em",
          textTransform: "uppercase", fontFamily: "monospace",
          color: "rgba(180,160,100,0.6)",
        }}>{tag}</span>
      ))}
    </div>
  );
}
