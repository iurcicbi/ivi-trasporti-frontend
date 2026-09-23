"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/lib/useContent";

const defaultNavItems = [
  { href: "/", label: "Home", id: "home", icon: "home" },
  { href: "/servizi", label: "Servizi", id: "services", icon: "rebase_edit" },
  { href: "/chi-siamo", label: "Chi siamo", id: "about", icon: "info" },
  { href: "/contatti", label: "Contatti", id: "contact", icon: "chat" },
];

export default function Header({ activeNav }: { activeNav?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const { get, content, loading, error } = useContent("globale");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debug: log dei contenuti in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !loading) {
      console.log('Header - Contenuti globali caricati:', {
        logo_text: get("logo_text", "IVI Trasporti"),
        logo_img_src: get("logo_img_src", ""),
        sezione: "globale",
        error: error,
        contentKeys: Object.keys(content),
      });
    }
  }, [content, loading, error, get]);

  const navItems = defaultNavItems.map((item) => ({
    ...item,
    label: get(`nav_${item.id}`, item.label),
  }));

  const logoText = get("logo_text", "IVI Trasporti");
  const logoSrc = get("logo_img_src", "");
  const phone = get("phone_number", "+393288625535");
  const phoneLabel = get("phone_label", "Chiama Ora");

  // Usa il rewrite di Next.js invece di costruire l'URL manualmente
  const logoUrl = logoSrc?.startsWith("/uploads/")
    ? logoSrc  // Next.js gestirà il rewrite automaticamente
    : logoSrc;

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md bg-surface/80 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-md flex justify-between items-center py-xs">
        <Link href="/" className="flex items-center gap-xs">
          {logoUrl ? (
            <img src={logoUrl} alt={logoText} className="h-24 w-24 w-auto" />
          ) : (
            <div>
            <span
              className="material-symbols-outlined text-primary text-headline-md"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_shipping
            </span>
                      <span className="text-headline-md font-headline-md text-primary font-bold tracking-tight">
            {logoText}
          </span>
          </div>
          )}

        </Link>
        <nav className="hidden md:flex items-center space-x-lg">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.id}
                href={item.href}
                className={`font-label-md text-label-md transition-opacity ${
                  activeNav === item.id
                    ? "text-primary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={`font-label-md text-label-md transition-opacity ${
                  activeNav === item.id
                    ? "text-primary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <a
          href={`tel:${phone}`}
          className="bg-secondary-container text-on-secondary-container px-md py-xs rounded-xl font-label-md text-label-md font-bold hover:opacity-90 transition-opacity active:scale-95 duration-200"
        >
          {phoneLabel}
        </a>
      </div>
    </header>
  );
}
