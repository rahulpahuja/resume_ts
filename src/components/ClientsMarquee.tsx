import React, { useRef, useState, useEffect, useMemo, CSSProperties } from "react";
import SectionHeading from "./SectionHeading";

type Client = {
  name: string;
  logoUrl: string;
  glow: string;
};

const clients: Client[] = [
  { name: "CyberArk", glow: "#22d3ee", logoUrl: "https://www.cyberark.com/wp-content/uploads/2024/10/cyberark-logo-tagline.svg" },
  { name: "Coforge", glow: "#3b82f6", logoUrl: "https://www.coforge.com/hubfs/website-assets/coforge-logo.svg" },
  { name: "CBA", glow: "#ef4444", logoUrl: "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg" },
  { name: "Bankwest", glow: "#facc15", logoUrl: "https://www.bankwest.com.au/content/dam/bankwest/system/logos/bankwest-logo.svg" },
  { name: "Conviva", glow: "#a855f7", logoUrl: "https://www.conviva.com/wp-content/themes/conviva2024/assets/images/conviva-logo-white.svg" },
  { name: "Intellicus", glow: "#38bdf8", logoUrl: "https://www.intellicus.com/wp-content/uploads/2024/01/Intellicus_logo_light.svg" },
  { name: "Chevron", glow: "#f97316", logoUrl: "https://www.chevron.com/-/media/shared-media/images/hallmark-2023-theme-light.png" },
  { name: "Shell", glow: "#eab308", logoUrl: "https://brandlogos.net/wp-content/uploads/2014/09/royal_dutch_shell-logo-brandlogo.net_.png" },
  { name: "Wipro", glow: "#312e81", logoUrl: "https://www.wipro.com/content/dam/wipro/social-icons/wipro_new_logo.svg" }
];

const injectKeyframes = () => {
  if (document.getElementById("marquee-frames")) return;

  const style = document.createElement("style");
  style.id = "marquee-frames";
  style.innerHTML = `
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  `;
  document.head.appendChild(style);
};

const bubbleBase: CSSProperties = {
  width: 110,
  height: 110,
  borderRadius: 9999,
  background: "rgba(255,255,255,0.28)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all .35s ease",
  flexShrink: 0
};

const ClientsMarquee = () => {
  const [paused, setPaused] = useState(false);
  const [rows, setRows] = useState(2);

  useEffect(() => {
    injectKeyframes();
    const calculateRows = () => {
      const h = window.innerHeight;
      setRows(h > 900 ? 3 : h > 700 ? 2 : 1);
    };
    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  const duplicated = useMemo(() => [...clients, ...clients], []);

  return (
    <section style={{ padding: "100px 0", position: "relative" }}>
      <SectionHeading title="Clients & Companies" subtitle="Organizations I've Worked With" />

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          marginTop: 64,
          position: "relative",
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
        }}
      >
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              gap: 64,
              width: "max-content",
              padding: "18px 0",
              animation: `marquee ${34 - rowIndex * 4}s linear infinite ${rowIndex % 2 ? "reverse" : ""}`,
              animationPlayState: paused ? "paused" : "running"
            }}
          >
            {duplicated.map((client, i) => (
              <ClientBubble
                key={`${rowIndex}-${i}`}
                client={client}
                floatDuration={rowIndex % 2 === 0 ? "6s" : "4s"}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const ClientBubble = ({
  client,
  floatDuration
}: {
  client: Client;
  floatDuration: string;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...bubbleBase,
        transform: hover ? "scale(1.12)" : "scale(1)",
        boxShadow: hover
          ? `0 0 46px ${client.glow}, inset 0 0 22px rgba(255,255,255,.45)`
          : `0 0 22px rgba(255,255,255,.25)`,
        animation: `float ${floatDuration} ease-in-out infinite`
      }}
    >
      <img
        src={client.logoUrl}
        alt={client.name}
        loading="lazy"
        style={{
          height: 44,
          maxWidth: 92,
          objectFit: "contain",
          imageRendering: "auto",
          filter: hover ? "grayscale(0)" : "grayscale(100%)",
          transition: "all .3s ease"
        }}
      />
    </div>
  );
};

export default ClientsMarquee;
