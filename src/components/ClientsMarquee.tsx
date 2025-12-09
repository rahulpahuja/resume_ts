import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  CSSProperties,
} from "react";
import SectionHeading from "./SectionHeading";

type Client = {
  name: string;
  logoUrl: string;
  glow: string;
};

const defaultClients: Client[] = [
  {
    name: "CyberArk",
    glow: "#22d3ee",
    logoUrl:
      "https://www.cyberark.com/wp-content/uploads/2024/10/cyberark-logo-tagline.svg",
  },
  {
    name: "Coforge",
    glow: "#3b82f6",
    logoUrl: "https://www.coforge.com/hubfs/website-assets/coforge-logo.svg",
  },
  {
    name: "CBA",
    glow: "#ef4444",
    logoUrl:
      "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg",
  },
  {
    name: "Bankwest",
    glow: "#facc15",
    logoUrl:
      "https://www.bankwest.com.au/content/dam/bankwest/system/logos/bankwest-logo.svg",
  },
  {
    name: "Conviva",
    glow: "#a855f7",
    logoUrl:
      "https://www.conviva.com/wp-content/themes/conviva2024/assets/images/conviva-logo-white.svg",
  },
  {
    name: "Intellicus",
    glow: "#38bdf8",
    logoUrl:
      "https://www.intellicus.com/wp-content/uploads/2024/01/Intellicus_logo_light.svg",
  },
  {
    name: "Chevron",
    glow: "#f97316",
    logoUrl:
      "https://www.chevron.com/-/media/shared-media/images/hallmark-2023-theme-light.png",
  },
  {
    name: "Shell",
    glow: "#eab308",
    logoUrl:
      "https://brandlogos.net/wp-content/uploads/2014/09/royal_dutch_shell-logo-brandlogo.net_.png",
  },
  {
    name: "Wipro",
    glow: "#312e81",
    logoUrl:
      "https://www.wipro.com/content/dam/wipro/social-icons/wipro_new_logo.svg",
  },
];

const duplicatedClients = [...defaultClients, ...defaultClients];

const injectKeyframes = () => {
  if (typeof document === "undefined") return;

  const existing = document.getElementById("clients-marquee-keyframes");
  if (existing) return;

  const style = document.createElement("style");
  style.id = "clients-marquee-keyframes";
  style.innerHTML = `
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes marqueeVertical {
      from { transform: translateY(0); }
      to { transform: translateY(-50%); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes particle {
      from { transform: translateY(0); opacity: .4; }
      to   { transform: translateY(-120vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};

const baseBubble: CSSProperties = {
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
};

type ClientsMarqueeProps = {
  clients?: Client[];
};

const ClientsMarquee: React.FC<ClientsMarqueeProps> = ({ clients }) => {
  const data = clients && clients.length > 0 ? clients : defaultClients;
  const duplicated = useMemo(() => [...data, ...data], [data]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(30);
  const [density, setDensity] = useState(18);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(false);

  const [audioReactive, setAudioReactive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Inject keyframes once on client
  useEffect(() => {
    injectKeyframes();
  }, []);

  // Handle viewport + density
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setDensity(w < 768 ? 12 : 22);
    };

    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Lazy activate when in viewport
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Audio-reactive glow
  useEffect(() => {
    if (!audioReactive || typeof navigator === "undefined") return;

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let rafId: number;
    let source: MediaStreamAudioSourceNode | null = null;

    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const loop = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const level = Math.min(1, avg / 160); // normalize
          setAudioLevel(level);
          rafId = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {
        console.warn("Audio reactive failed:", e);
        setAudioReactive(false);
      }
    };

    setup();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (source && audioContext) {
        try {
          source.disconnect();
          audioContext.close();
        } catch {
          // ignore
        }
      }
    };
  }, [audioReactive]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!marqueeRef.current) return;
    marqueeRef.current.scrollLeft += e.touches[0].clientX * -0.06;
  };

  // Precompute particle seeds to avoid re-randomising on every render
  const particleSeeds = useMemo(
    () =>
      Array.from({ length: density }).map(() => ({
        left: Math.random() * 100,
        duration: 18 + Math.random() * 10,
        size: 4 + Math.random() * 4,
        delay: Math.random() * 10,
      })),
    [density]
  );

  return (
    <section
      ref={sectionRef as any}
      style={{
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particle / Noise Background */}
      {particleSeeds.map((p, idx) => (
        <span
          key={idx}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "100%",
            width: p.size,
            height: p.size,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.45)",
            animation: `particle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            zIndex: 0,
          }}
        />
      ))}

      <SectionHeading
        title="Clients & Companies"
        subtitle="Organizations I've Worked With"
      />

      {/* Controls */}
      <div
        style={{
          margin: "24px auto 0",
          width: 280,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: 12, fontSize: 14, opacity: 0.8 }}>
          Scroll Speed
        </div>
        <input
          type="range"
          min={15}
          max={60}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <button
          type="button"
          onClick={() => setAudioReactive((prev) => !prev)}
          style={{
            marginTop: 16,
            padding: "6px 14px",
            fontSize: 13,
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.4)",
            background: audioReactive
              ? "rgba(34,197,94,0.15)"
              : "rgba(15,23,42,0.35)",
            color: "#ffffff",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
          }}
        >
          {audioReactive ? "Disable Audio Reactive Glow" : "Enable Audio Reactive Glow"}
        </button>
      </div>

      {/* Marquee Container */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchMove={handleTouchMove}
        style={{
          marginTop: 56,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isMobile ? (
          // Vertical for mobile
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              height: 420,
              animation: active
                ? `marqueeVertical ${speed - 6}s linear infinite`
                : "none",
            }}
          >
            {duplicated.map((client, index) => (
              <ClientBubble
                key={`m-${index}`}
                client={client}
                floatDuration="4s"
                audioLevel={audioLevel}
              />
            ))}
          </div>
        ) : (
          // Horizontal for desktop
          <div
            ref={marqueeRef}
            style={{
              display: "flex",
              gap: 64,
              width: "max-content",
              animation: active ? `marquee ${speed}s linear infinite` : "none",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {duplicated.map((client, index) => (
              <ClientBubble
                key={index}
                client={client}
                floatDuration={index % 2 === 0 ? "6s" : "4s"}
                audioLevel={audioLevel}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

type ClientBubbleProps = {
  client: Client;
  floatDuration: string;
  audioLevel: number;
};

const ClientBubble: React.FC<ClientBubbleProps> = ({
  client,
  floatDuration,
  audioLevel,
}) => {
  const [hover, setHover] = useState(false);

  const audioScale = 1 + audioLevel * 0.25;
  const hoverScale = hover ? 1.12 : 1;
  const finalScale = hoverScale * audioScale;

  const baseGlowRadius = hover ? 45 : 22;
  const dynamicGlowRadius = baseGlowRadius + audioLevel * 30;

  const boxShadow = hover
    ? `0 0 ${dynamicGlowRadius}px ${client.glow}, inset 0 0 22px rgba(255,255,255,0.45)`
    : `0 0 ${dynamicGlowRadius * 0.6}px rgba(255,255,255,0.35)`;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...baseBubble,
        transform: `scale(${finalScale})`,
        boxShadow,
        animation: `float ${floatDuration} ease-in-out infinite`,
      }}
    >
      <img
        src={client.logoUrl}
        alt={client.name}
        loading="lazy"
        style={{
          height: 42,
          maxWidth: 96,
          objectFit: "contain",
          filter: hover ? "grayscale(0)" : "grayscale(100%)",
          transition: "all .3s ease",
        }}
      />
    </div>
  );
};

export default ClientsMarquee;
