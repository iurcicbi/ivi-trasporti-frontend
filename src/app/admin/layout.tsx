"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getToken } from "@/lib/api";
import { useContent } from "@/lib/useContent";

const sidebarItems = [
  { href: "/admin", label: "Pagine", icon: "pages" },
  { href: "/", label: "Vedi Sito", icon: "open_in_new", external: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { get, loading } = useContent("globale");

  const logoSrc = get("logo_img_src", "");
  const logoUrl = logoSrc?.startsWith("/uploads/")
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${logoSrc}`
    : logoSrc;

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthed(true);
      return;
    }
    if (!getToken()) {
      router.push("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [pathname, router]);

  if (!authed) return null;

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen bg-surface flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col transition-all duration-300 shrink-0 h-screen`}
      >
        {/* Logo */}
        <div className="flex items-center gap-sm p-md border-b border-outline-variant/20 min-h-[60px]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity"
          >
            menu
          </button>
          {sidebarOpen && (
            <div className="flex items-center gap-xs min-w-0">
              {logoUrl && !loading && (
                <img src={logoUrl} alt="" className="h-6 w-auto shrink-0" />
              )}
              <span className="text-headline-sm font-headline-sm text-primary font-bold truncate">
                CMS IVI
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-sm space-y-xs">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-sm px-md py-sm rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary group"
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  {sidebarOpen && <span className="text-label-md font-label-md">{item.label}</span>}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-sm px-md py-sm rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                {sidebarOpen && <span className="text-label-md font-label-md">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-sm border-t border-outline-variant/20">
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/admin/login");
            }}
            className="flex items-center gap-sm px-md py-sm rounded-xl text-error hover:bg-error-container/10 transition-colors w-full"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            {sidebarOpen && <span className="text-label-md font-label-md">Esci</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
