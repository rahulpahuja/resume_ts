import { useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';

const clients = [
  {
    name: "CyberArk",
    logoUrl: "https://www.cyberark.com/wp-content/uploads/2024/10/cyberark-logo-tagline.svg"
  },
  {
    name: "Coforge",
    logoUrl: "https://www.coforge.com/hubfs/website-assets/coforge-logo.svg"
  },
  {
    name: "CBA",
    logoUrl: "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg"
  },
  {
    name: "Bankwest",
    logoUrl: "https://www.bankwest.com.au/content/dam/bankwest/system/logos/bankwest-logo.svg"
  },
  {
    name: "Conviva",
    logoUrl: "https://www.conviva.com/wp-content/themes/conviva2024/assets/images/conviva-logo-white.svg"
  },
  {
    name: "Intellicus",
    logoUrl: "https://www.intellicus.com/wp-content/uploads/2024/01/Intellicus_logo_light.svg"
  },
  {
    name: "Chevron",
    logoUrl: "https://www.chevron.com/-/media/shared-media/images/hallmark-2023-theme-light.png"
  },
  {
    name: "Elcita",
    logoUrl: "https://elcita.in/wp-content/uploads/2022/07/elcita-logo-2-3.png"
  },
  {
    name: "Mahindra First Choice",
    logoUrl: "https://www.mahindrafirstchoice.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fwms%2Fdesktop_logo_80c2a99dd5.png&w=640&q=75"
  },
  {
    name: "Shell",
    logoUrl: "https://brandlogos.net/wp-content/uploads/2014/09/royal_dutch_shell-logo-brandlogo.net_.png"
  },
  {
    name: "Wipro",
    logoUrl: "https://www.wipro.com/content/dam/wipro/social-icons/wipro_new_logo.svg"
  }
];

const ClientsMarquee = () => {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === marqueeRef1.current) {
            entry.target.classList.add('animate-marquee-left');
          } else if (entry.target === marqueeRef2.current) {
            entry.target.classList.add('animate-marquee-right');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (marqueeRef1.current) observer.observe(marqueeRef1.current);
    if (marqueeRef2.current) observer.observe(marqueeRef2.current);

    return () => {
      if (marqueeRef1.current) observer.unobserve(marqueeRef1.current);
      if (marqueeRef2.current) observer.unobserve(marqueeRef2.current);
    };
  }, []);

  return (
    <section className="py-16">
      <SectionHeading 
        title="Clients & Companies" 
        subtitle="Organizations I've Worked With"
      />

      <div className="mt-8 overflow-hidden">
        <div 
          ref={marqueeRef1}
          className="flex space-x-8 py-4 opacity-60"
        >
          {clients.slice(0, Math.ceil(clients.length / 2)).map((client, index) => (
            <ClientLogo key={index} name={client.name} logoUrl={client.logoUrl} />
          ))}
        </div>

        <div 
          ref={marqueeRef2}
          className="flex space-x-8 py-4 opacity-60"
        >
          {clients.slice(Math.ceil(clients.length / 2)).map((client, index) => (
            <ClientLogo key={index} name={client.name} logoUrl={client.logoUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ClientLogo = ({ name, logoUrl }: { name: string; logoUrl: string }) => (
  <div className="flex items-center justify-center min-w-[120px] h-16">
    <img 
      src={logoUrl} 
      alt={name} 
      className="h-10 max-w-[120px] object-contain filter invert brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300" 
    />
  </div>
);

export default ClientsMarquee;