import StarPanel, { Intro } from "./StarPanel";

const COLOR = "#ffd0a0";

interface Props {
  onClose: () => void;
}

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.09a16 16 0 0 0 5.83 5.83l1.26-1.26a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const CONTACTS = [
  { label: "Email",     value: "loftylogan@gmail.com",      href: "mailto:loftylogan@gmail.com",               icon: <EmailIcon />     },
  { label: "Phone",     value: "210-412-3039",               href: "tel:2104123039",                            icon: <PhoneIcon />     },
  { label: "Instagram", value: "@loganleetwentythree",       href: "https://instagram.com/loganleetwentythree", icon: <InstagramIcon /> },
  { label: "Discord",   value: "loganlee23",                 href: "https://discord.com/users/loganlee23",      icon: <DiscordIcon />   },
];

export default function Contact({ onClose }: Props) {
  return (
    <StarPanel color={COLOR} name="Contact" role="Get In Touch" onClose={onClose}>
      <Intro>
        I'm always open to talk about anything!
      </Intro>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
        {CONTACTS.map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "14px 18px",
              background: `${COLOR}0d`,
              border: `1px solid ${COLOR}30`,
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${COLOR}1a`;
              (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}66`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${COLOR}0d`;
              (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}30`;
            }}
          >
            <span style={{ color: COLOR, opacity: 0.7, display: "flex", alignItems: "center", flexShrink: 0 }}>
              {icon}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace", color: "rgba(180,160,100,0.45)" }}>
                {label}
              </span>
              <span style={{ fontSize: "0.95rem", color: "rgba(220,210,190,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </StarPanel>
  );
}
