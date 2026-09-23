"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getToken, API_BASE } from "@/lib/api";
import ImageUpload from "../components/ImageUpload";
import FileUpload from "../components/FileUpload";

type Tab = "contenuti" | "seo";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "file";
  placeholder?: string;
}

interface SectionDef {
  id: string;
  title: string;
  icon: string;
  desc?: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: "logo",
    title: "Logo e Brand",
    icon: "logo_dev",
    desc: "Logo del sito e nome brand",
    fields: [
      { key: "logo_img_src", label: "Logo (immagine)", type: "image" },
      { key: "logo_text", label: "Testo logo", type: "text", placeholder: "IVI Trasporti" },
    ],
  },
  {
    id: "nav",
    title: "Menu di Navigazione",
    icon: "menu_book",
    desc: "Testo delle voci del menu principale",
    fields: [
      { key: "nav_home", label: "Voce Home", type: "text" },
      { key: "nav_services", label: "Voce Servizi", type: "text" },
      { key: "nav_about", label: "Voce Chi Siamo", type: "text" },
      { key: "nav_contact", label: "Voce Contatti", type: "text" },
    ],
  },
  {
    id: "phone",
    title: "Telefono",
    icon: "call",
    desc: "Numero e testo pulsante chiamata",
    fields: [
      { key: "phone_number", label: "Numero di telefono", type: "text", placeholder: "+393288625535" },
      { key: "phone_label", label: "Testo pulsante chiamata", type: "text", placeholder: "Chiama Ora" },
    ],
  },
  {
    id: "sede",
    title: "Sede Operativa",
    icon: "location_on",
    desc: "Indirizzo mostrato nel footer",
    fields: [
      { key: "footer_sede_title", label: "Titolo sezione", type: "text" },
      { key: "footer_sede_indirizzo", label: "Indirizzo", type: "text" },
      { key: "footer_sede_citta", label: "Città e CAP", type: "text" },
      { key: "footer_sede_paese", label: "Paese", type: "text" },
    ],
  },
  {
    id: "contatti",
    title: "Contatti Diretti",
    icon: "contact_mail",
    desc: "Recapiti nel footer",
    fields: [
      { key: "footer_contatti_title", label: "Titolo sezione", type: "text" },
      { key: "footer_telefono", label: "Telefono", type: "text" },
      { key: "footer_email", label: "Email", type: "text" },
      { key: "footer_pec", label: "PEC", type: "text" },
    ],
  },
  {
    id: "legali",
    title: "Informazioni Legali",
    icon: "description",
    desc: "Dati societari, privacy e cookie policy",
    fields: [
      { key: "footer_legali_title", label: "Titolo sezione", type: "text" },
      { key: "footer_piva", label: "Partita IVA", type: "text" },
      { key: "footer_rea", label: "Numero REA", type: "text" },
      { key: "footer_privacy_label", label: "Testo link Privacy", type: "text" },
      { key: "privacy_policy_url", label: "Documento Privacy (PDF)", type: "file" },
      { key: "footer_termini_label", label: "Testo link Cookie", type: "text" },
      { key: "cookie_policy_url", label: "Documento Cookie (PDF)", type: "file" },
    ],
  },
  {
    id: "extra",
    title: "Extra",
    icon: "more_horiz",
    fields: [
      { key: "footer_seguici_title", label: "Titolo sezione social", type: "text" },
      { key: "footer_copyright", label: "Testo copyright", type: "textarea" },
      { key: "footer_lang_label", label: "Label lingua", type: "text" },
      { key: "footer_version", label: "Versione", type: "text" },
    ],
  },
];

const SEO_PAGES = [
  { id: "home", label: "Home", icon: "cottage" },
  { id: "servizi", label: "Servizi", icon: "assignment" },
  { id: "chi-siamo", label: "Chi Siamo", icon: "diversity_3" },
  { id: "contatti", label: "Contatti", icon: "contact_mail" },
];

const SEO_FIELDS = [
  { keySuffix: "title", label: "Meta Title", type: "text" as const, tip: "Tra 50 e 60 caratteri consigliati" },
  { keySuffix: "description", label: "Meta Description", type: "textarea" as const, tip: "Tra 120 e 160 caratteri consigliati" },
  { keySuffix: "og_image", label: "OG Image (condivisione social)", type: "image" as const, tip: "1200x630px consigliati" },
];

interface SeoCheck {
  page: string;
  pageLabel: string;
  field: string;
  key: string;
  status: "ok" | "warning" | "error";
  message: string;
  suggestion: string;
  suggestedValue?: string;
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: any;
  onChange: (value: any) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={field.placeholder}
          className="w-full bg-surface border border-outline-variant/30 rounded-xl p-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-body-sm resize-y"
        />
      );
    case "image":
      return <ImageUpload value={value ?? ""} onChange={onChange} label={field.label} />;
    case "file":
      return <FileUpload value={value ?? ""} onChange={onChange} label={field.label} />;
    default:
      return (
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full bg-surface border border-outline-variant/30 rounded-xl px-md py-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-body-sm"
        />
      );
  }
}

const SEO_SUGGESTIONS: Record<string, { title: string; description: string }> = {
  home: {
    title: "IVI Trasporti — Trasporti Nazionali e Internazionali",
    description: "IVI Trasporti offre servizi di trasporto nazionale e internazionale affidabili e puntuali. Richiedi un preventivo gratuito per la tua merce.",
  },
  servizi: {
    title: "Servizi di Trasporto Nazionali e Internazionali — IVI Trasporti",
    description: "Scopri tutti i servizi di trasporto di IVI Trasporti: trasporto nazionale, internazionale, spedizioni express e logistica industriale. Richiedi un preventivo.",
  },
  "chi-siamo": {
    title: "Chi Siamo — IVI Trasporti | Storia, Valori e Flotta",
    description: "IVI Trasporti: professionalità, trasparenza e attenzione ai dettagli. Scopri la nostra storia, i nostri valori e la nostra flotta di mezzi moderni.",
  },
  contatti: {
    title: "Contatta IVI Trasporti — Preventivo Gratuito",
    description: "Contatta IVI Trasporti per un preventivo gratuito e personalizzato. Sede a Parma, operativi in tutta Italia e Europa. Chiama o scrivici.",
  },
};

function runSeoAnalysis(values: Record<string, any>): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const brand = values["logo_text"] || "IVI Trasporti";

  for (const page of SEO_PAGES) {
    const prefix = `seo_${page.id}`;
    const sug = SEO_SUGGESTIONS[page.id];

    // Check meta title
    const titleKey = `${prefix}_title`;
    const title = values[titleKey] || "";
    if (!title) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Title",
        key: titleKey,
        status: "error", message: "Mancante",
        suggestion: `Aggiungi un meta title per la pagina ${page.label}`,
        suggestedValue: sug?.title || `${brand} — ${page.label}`,
      });
    } else if (title.length < 30) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Title",
        key: titleKey,
        status: "warning", message: `Troppo corto (${title.length} car.)`,
        suggestion: `Suggerito: "${sug?.title || title}"`,
        suggestedValue: sug?.title || title,
      });
    } else if (title.length > 70) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Title",
        key: titleKey,
        status: "warning", message: `Troppo lungo (${title.length} car.)`,
        suggestion: "Riduci a 50-60 caratteri",
      });
    } else {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Title",
        key: titleKey,
        status: "ok", message: `${title.length} caratteri`,
        suggestion: "",
      });
    }

    // Check meta description
    const descKey = `${prefix}_description`;
    const desc = values[descKey] || "";
    if (!desc) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Description",
        key: descKey,
        status: "error", message: "Mancante",
        suggestion: `Aggiungi una meta description per ${page.label}`,
        suggestedValue: sug?.description || `${brand} — Servizio di trasporto professionale.`,
      });
    } else if (desc.length < 100) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Description",
        key: descKey,
        status: "warning", message: `Troppo corta (${desc.length} car.)`,
        suggestion: `Suggerita: "${sug?.description || desc}"`,
        suggestedValue: sug?.description || desc,
      });
    } else if (desc.length > 170) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Description",
        key: descKey,
        status: "warning", message: `Troppo lunga (${desc.length} car.)`,
        suggestion: "Riduci a 120-160 caratteri",
      });
    } else {
      checks.push({
        page: page.id, pageLabel: page.label, field: "Meta Description",
        key: descKey,
        status: "ok", message: `${desc.length} caratteri`,
        suggestion: "",
      });
    }

    // Check OG image
    const ogKey = `${prefix}_og_image`;
    const og = values[ogKey] || "";
    if (!og) {
      checks.push({
        page: page.id, pageLabel: page.label, field: "OG Image",
        key: ogKey,
        status: "warning", message: "Non impostata",
        suggestion: "Carica un'immagine 1200x630px per la condivisione social",
      });
    } else {
      checks.push({
        page: page.id, pageLabel: page.label, field: "OG Image",
        key: ogKey,
        status: "ok", message: "Impostata",
        suggestion: "",
      });
    }
  }

  // Global checks
  const logoKey = "logo_img_src";
  const logo = values[logoKey] || "";
  if (!logo) {
    checks.push({
      page: "globale", pageLabel: "Globale", field: "Logo",
      key: logoKey,
      status: "warning", message: "Non caricato",
      suggestion: "Carica il logo del sito nella sezione Contenuti → Logo e Brand",
    });
  }

  const privacyKey = "privacy_policy_url";
  const privacy = values[privacyKey] || "";
  if (!privacy) {
    checks.push({
      page: "globale", pageLabel: "Globale", field: "Privacy Policy (PDF)",
      key: privacyKey,
      status: "warning", message: "Non caricato",
      suggestion: "Carica il documento Privacy Policy in formato PDF",
    });
  }

  const cookieKey = "cookie_policy_url";
  const cookie = values[cookieKey] || "";
  if (!cookie) {
    checks.push({
      page: "globale", pageLabel: "Globale", field: "Cookie Policy (PDF)",
      key: cookieKey,
      status: "warning", message: "Non caricato",
      suggestion: "Carica il documento Cookie Policy in formato PDF",
    });
  }

  return checks;
}

export default function AdminGlobalePage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("contenuti");
  const [values, setValues] = useState<Record<string, any>>({});
  const [originals, setOriginals] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [seoExpanded, setSeoExpanded] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/contents/list?section=globale`
      );
      if (!res.ok) throw new Error();
      const list = await res.json();
      const map: Record<string, any> = {};
      list.forEach((item: any) => {
        map[item.key] = item.value;
      });
      setValues(map);
      setOriginals({ ...map });
    } catch {
      setValues({});
      setOriginals({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateValue = (key: string, val: any) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const hasChanges = (keys: string[]) =>
    keys.some((k) => values[k] !== originals[k]);

  const toggleSection = (id: string) => {
    setCollapsed((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSeoPage = (id: string) => {
    setSeoExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const contentKeys = SECTIONS.flatMap((s) => s.fields.map((f) => f.key));
      const seoKeys = SEO_PAGES.flatMap((p) =>
        SEO_FIELDS.map((f) => `seo_${p.id}_${f.keySuffix}`)
      );
      const allKeys = [...contentKeys, ...seoKeys, "seo_global_title", "seo_global_description", "seo_global_og_image"];
      const updates = allKeys.map((key) => ({ key, value: values[key] ?? "" }));
      const res = await fetch(
        `${API_BASE}/contents/bulk`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ updates }),
        }
      );
      if (!res.ok) throw new Error();
      setSaved(true);
      setOriginals({ ...values });
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Errore nel salvataggio");
    } finally {
      setSaving(false);
    }
  };

  const allContentKeys = SECTIONS.flatMap((s) => s.fields.map((f) => f.key));
  const allSeoKeys = SEO_PAGES.flatMap((p) =>
    SEO_FIELDS.map((f) => `seo_${p.id}_${f.keySuffix}`)
  ).concat(["seo_global_title", "seo_global_description", "seo_global_og_image"]);

  const currentKeys = tab === "contenuti" ? allContentKeys : allSeoKeys;
  const anyChange = currentKeys.some((k) => values[k] !== originals[k]);

  const seoChecks = runSeoAnalysis(values);
  const errorCount = seoChecks.filter((c) => c.status === "error").length;
  const warningCount = seoChecks.filter((c) => c.status === "warning").length;
  const okCount = seoChecks.filter((c) => c.status === "ok").length;

  const seoStatusIcon = errorCount > 0 ? "error" : warningCount > 0 ? "warning" : "check_circle";
  const seoStatusColor = errorCount > 0 ? "text-error" : warningCount > 0 ? "text-amber-500" : "text-green-500";

  return (
    <div className="p-lg md:p-xl max-w-4xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface pb-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-sm mb-xs">
            <button
              onClick={() => router.push("/admin")}
              className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity"
            >
              arrow_back
            </button>
            <h1 className="text-headline-lg font-headline-lg text-primary">Impostazioni Globali</h1>
          </div>
          <p className="text-body-sm text-on-surface-variant ml-xl">
            Logo, menu, footer, documenti legali e SEO
          </p>
        </div>
        <div className="flex items-center gap-md">
          {saved && (
            <span className="flex items-center gap-xs text-body-sm text-green-600">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Salvato
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !anyChange}
            className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-xs shadow-lg"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? "Salvataggio..." : "Salva"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-sm mb-lg border-b border-outline-variant/20">
        <button
          onClick={() => setTab("contenuti")}
          className={`pb-sm px-sm text-label-md font-label-md transition-all border-b-2 -mb-[1px] ${
            tab === "contenuti"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            Contenuti
          </span>
        </button>
        <button
          onClick={() => setTab("seo")}
          className={`pb-sm px-sm text-label-md font-label-md transition-all border-b-2 -mb-[1px] ${
            tab === "seo"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-primary"
          }`}
        >
          <span className="flex items-center gap-xs">
            <span className={`material-symbols-outlined text-sm ${seoStatusColor}`}>{seoStatusIcon}</span>
            SEO
            {(errorCount + warningCount) > 0 && (
              <span className="text-label-xs bg-error-container text-error rounded-full px-xs py-[1px]">
                {errorCount + warningCount}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Content Tab */}
      {tab === "contenuti" && (
        <>
          {loading ? (
            <div className="text-center text-on-surface-variant py-2xl">
              <span className="material-symbols-outlined text-4xl mb-md block animate-spin">progress_activity</span>
              Caricamento...
            </div>
          ) : (
            <div className="space-y-md">
              {SECTIONS.map((sec) => {
                const changed = hasChanges(sec.fields.map((f) => f.key));
                const isOpen = !collapsed.includes(sec.id);

                return (
                  <div key={sec.id} className={`bg-surface-container-lowest rounded-2xl border overflow-hidden transition-all ${changed ? "border-primary/40 shadow-md" : "border-outline-variant/20"}`}>
                    <button onClick={() => toggleSection(sec.id)} className="w-full flex items-center justify-between px-lg py-md hover:bg-surface-container-high/50 transition-colors">
                      <div className="flex items-center gap-md">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${changed ? "bg-primary-container text-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                          <span className="material-symbols-outlined text-lg">{sec.icon}</span>
                        </div>
                        <div className="text-left">
                          <span className="text-label-lg font-label-lg text-primary">{sec.title}</span>
                          {sec.desc && <span className="text-body-xs text-on-surface-variant block">{sec.desc}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-sm">
                        {changed && <span className="w-2 h-2 rounded-full bg-primary" />}
                        <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-lg pb-md space-y-md border-t border-outline-variant/10 pt-md">
                        {sec.fields.map((field) => (
                          <div key={field.key}>
                            <label className="text-label-xs text-on-surface-variant mb-xs font-bold uppercase tracking-wider block">{field.label}</label>
                            <FieldRenderer field={field} value={values[field.key] ?? ""} onChange={(v) => updateValue(field.key, v)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* SEO Tab */}
      {tab === "seo" && (
        <>
          {loading ? (
            <div className="text-center text-on-surface-variant py-2xl">
              <span className="material-symbols-outlined text-4xl mb-md block animate-spin">progress_activity</span>
              Caricamento...
            </div>
          ) : (
            <div className="space-y-lg">
              {/* Analysis Summary */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
                <div className="px-lg py-md bg-surface-container-high/30 border-b border-outline-variant/10">
                  <h2 className="text-label-lg font-label-lg text-primary">Analisi SEO</h2>
                  <p className="text-body-xs text-on-surface-variant">Controllo automatico dei contenuti del sito</p>
                </div>
                <div className="p-lg">
                  <div className="flex gap-md mb-md">
                    <div className="flex items-center gap-xs text-green-600">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span className="text-label-sm font-label-sm">{okCount} ok</span>
                    </div>
                    <div className="flex items-center gap-xs text-amber-500">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      <span className="text-label-sm font-label-sm">{warningCount} suggerimenti</span>
                    </div>
                    <div className="flex items-center gap-xs text-error">
                      <span className="material-symbols-outlined text-sm">error</span>
                      <span className="text-label-sm font-label-sm">{errorCount} da risolvere</span>
                    </div>
                  </div>

                  <div className="space-y-xs max-h-96 overflow-y-auto">
                    {seoChecks.map((check, i) => (
                      <div key={i} className={`flex items-start gap-sm p-sm rounded-xl ${
                        check.status === "error" ? "bg-error-container/20" :
                        check.status === "warning" ? "bg-amber-50" : "bg-green-50"
                      }`}>
                        <span className={`material-symbols-outlined text-sm mt-[2px] ${
                          check.status === "error" ? "text-error" :
                          check.status === "warning" ? "text-amber-500" : "text-green-600"
                        }`}>
                          {check.status === "error" ? "error" : check.status === "warning" ? "warning" : "check_circle"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-label-sm font-label-sm text-primary">{check.pageLabel}</span>
                          <span className="text-label-sm text-on-surface-variant"> — {check.field}: </span>
                          <span className="text-label-sm">{check.message}</span>
                          {check.suggestion && (
                            <p className="text-body-xs text-on-surface-variant mt-[2px]">{check.suggestion}</p>
                          )}
                        </div>
                        {check.suggestedValue && (
                          <button
                            onClick={() => updateValue(check.key, check.suggestedValue!)}
                            className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary text-label-xs font-label-xs px-sm py-xs rounded-lg transition-all active:scale-95 flex items-center gap-[2px]"
                          >
                            <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                            Applica
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Per-page SEO fields */}
              <div className="space-y-md">
                {SEO_PAGES.map((page) => {
                  const keys = SEO_FIELDS.map((f) => `seo_${page.id}_${f.keySuffix}`);
                  const changed = hasChanges(keys);
                  const isOpen = seoExpanded.includes(page.id);

                  return (
                    <div key={page.id} className={`bg-surface-container-lowest rounded-2xl border overflow-hidden transition-all ${changed ? "border-primary/40 shadow-md" : "border-outline-variant/20"}`}>
                      <button onClick={() => toggleSeoPage(page.id)} className="w-full flex items-center justify-between px-lg py-md hover:bg-surface-container-high/50 transition-colors">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container-high text-on-surface-variant">
                            <span className="material-symbols-outlined text-lg">{page.icon}</span>
                          </div>
                          <div>
                            <span className="text-label-lg font-label-lg text-primary">{page.label}</span>
                            <span className="text-body-xs text-on-surface-variant block">Meta Title, Description e OG Image</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-sm">
                          {changed && <span className="w-2 h-2 rounded-full bg-primary" />}
                          <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-lg pb-md space-y-md border-t border-outline-variant/10 pt-md">
                          {SEO_FIELDS.map((f) => {
                            const key = `seo_${page.id}_${f.keySuffix}`;
                            return (
                              <div key={key}>
                                <label className="text-label-xs text-on-surface-variant mb-xs font-bold uppercase tracking-wider block">
                                  {f.label}
                                  <span className="text-label-xs text-outline font-normal normal-case ml-xs">({f.tip})</span>
                                </label>
                                {f.type === "textarea" ? (
                                  <textarea
                                    value={String(values[key] ?? "")}
                                    onChange={(e) => updateValue(key, e.target.value)}
                                    rows={3}
                                    className="w-full bg-surface border border-outline-variant/30 rounded-xl p-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-body-sm resize-y"
                                  />
                                ) : f.type === "image" ? (
                                  <ImageUpload value={values[key] ?? ""} onChange={(v) => updateValue(key, v)} label={f.label} />
                                ) : (
                                  <input
                                    value={String(values[key] ?? "")}
                                    onChange={(e) => updateValue(key, e.target.value)}
                                    className="w-full bg-surface border border-outline-variant/30 rounded-xl px-md py-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-body-sm"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Sticky save */}
      {anyChange && (
        <div className="sticky bottom-lg flex justify-end mt-lg">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary px-xl py-md rounded-2xl font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl flex items-center gap-xs"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      )}
    </div>
  );
}
