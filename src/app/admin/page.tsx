"use client";

import Link from "next/link";

const pages = [
  {
    id: "globale",
    title: "Globale",
    subtitle: "Header, Footer, Logo, Contatti",
    icon: "settings",
    color: "from-primary to-primary-container",
    countLabel: "7 sezioni",
  },
  {
    id: "home",
    title: "Home",
    subtitle: "Pagina principale",
    icon: "home",
    color: "from-secondary-container to-secondary",
    countLabel: "6 sezioni",
  },
  {
    id: "servizi",
    title: "Servizi",
    subtitle: "Servizi di trasporto",
    icon: "rebase_edit",
    color: "from-tertiary-container to-tertiary",
    countLabel: "9 sezioni",
  },
  {
    id: "chi-siamo",
    title: "Chi Siamo",
    subtitle: "Chi siamo",
    icon: "info",
    color: "from-primary to-primary-container",
    countLabel: "4 sezioni",
  },
  {
    id: "contatti",
    title: "Contatti",
    subtitle: "Contatti e form",
    icon: "chat",
    color: "from-secondary-container to-secondary",
    countLabel: "4 sezioni",
  },
];

const pageIcons: Record<string, string> = {
  globale: "tune",
  home: "cottage",
  servizi: "assignment",
  "chi-siamo": "diversity_3",
  contatti: "contact_mail",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-lg md:p-xl max-w-5xl">
      {/* Header */}
      <div className="mb-xl">
        <h1 className="text-display-sm font-display-sm text-primary mb-xs">Pagine</h1>
        <p className="text-body-md text-on-surface-variant">
          Seleziona una pagina per modificarne i contenuti
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {pages.map((page) => (
          <Link
            key={page.id}
                href={page.id === "globale" ? "/admin/globale" : `/admin/sections/${page.id}`}
            className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-lg">
              <div className="flex items-start justify-between mb-md">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${page.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <span className="material-symbols-outlined text-on-primary text-2xl">
                    {pageIcons[page.id] || page.icon}
                  </span>
                </div>
                <span className="bg-surface-container-high text-label-sm font-label-sm text-on-surface-variant px-sm py-xs rounded-lg">
                  {page.countLabel}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-xs group-hover:text-secondary-container transition-colors">
                {page.title}
              </h3>
              <p className="text-body-sm text-on-surface-variant">{page.subtitle}</p>
            </div>
            <div className="px-lg py-sm bg-surface-container-high/50 border-t border-outline-variant/10 flex items-center justify-between">
              <span className="text-label-sm text-outline">Modifica contenuti</span>
              <span className="material-symbols-outlined text-primary text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
