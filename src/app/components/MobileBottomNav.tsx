"use client";

import Link from "next/link";
import { useContent } from "@/lib/useContent";

const defaultNavItems = [
  { href: "/", label: "Home", id: "home", icon: "home" },
  { href: "/servizi", label: "Servizi", id: "services", icon: "rebase_edit" },
  { href: "/chi-siamo", label: "Chi siamo", id: "about", icon: "info" },
  { href: "/contatti", label: "Contatti", id: "contact", icon: "chat" },
];

export default function MobileBottomNav({ activeNav }: { activeNav?: string }) {
  const { get } = useContent("globale");

  const navItems = defaultNavItems.map((item) => ({
    ...item,
    label: get(`nav_${item.id}`, item.label),
  }));

  const phone = get("phone_number", "+393288625535");

  return (
    <>
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center pb-safe pt-2 px-2">
        {navItems.map((item) =>
          item.href.startsWith("/#") ? (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-transform ${
                activeNav === item.id
                  ? "bg-secondary-container text-on-secondary-container scale-90"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  activeNav === item.id
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-transform ${
                activeNav === item.id
                  ? "bg-secondary-container text-on-secondary-container scale-90"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  activeNav === item.id
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </Link>
          )
        )}
      </nav>

      <a
        className="md:hidden fixed bottom-24 right-sm bg-secondary-container text-on-secondary-container w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 animate-bounce"
        href={`tel:${phone}`}
      >
        <span className="material-symbols-outlined text-3xl">call</span>
      </a>
    </>
  );
}
