"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getToken, API_BASE } from "@/lib/api";
import { getGroupsForSection, type SectionGroup, type GroupField } from "@/lib/sectionGroups";
import ImageUpload from "../../components/ImageUpload";

const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  servizi: "Servizi",
  "chi-siamo": "Chi Siamo",
  contatti: "Contatti",
};

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: GroupField;
  value: any;
  onChange: (v: any) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-white border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm resize-y"
        />
      );
    case "image":
      return <ImageUpload value={value ?? ""} onChange={onChange} label={field.label} />;
    default:
      return (
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
        />
      );
  }
}

function GroupCard({
  group,
  values,
  originals,
  onUpdate,
}: {
  group: SectionGroup;
  values: Record<string, any>;
  originals: Record<string, any>;
  onUpdate: (key: string, val: any) => void;
}) {
  const [open, setOpen] = useState(false);

  const hasChanges = group.fields.some((f) => values[f.key] !== originals[f.key]);

  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden transition-all ${
        hasChanges
          ? "border-blue-400 shadow-md ring-1 ring-blue-200"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              hasChanges
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{group.icon}</span>
          </div>
          <div className="text-left min-w-0">
            <span className="text-sm font-semibold text-gray-800 block truncate">
              {group.title}
            </span>
            <span className="text-xs text-gray-500 block truncate">
              {group.fields.length} {group.fields.length === 1 ? "campo" : "campi"}
              {group.desc && ` — ${group.desc}`}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {hasChanges && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          <span
            className={`material-symbols-outlined text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </div>
      </button>

      {/* Fields */}
      {open && (
        <div className="px-6 pb-4 space-y-4 border-t border-gray-100 pt-4">
          {group.fields.map((field) => {
            const val = values[field.key] ?? "";
            return (
              <div key={field.key}>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1.5">
                  {field.label}
                  {field.type === "image" && (
                    <span className="material-symbols-outlined text-sm text-gray-400">image</span>
                  )}
                  {field.type === "textarea" && (
                    <span className="material-symbols-outlined text-sm text-gray-400">article</span>
                  )}
                </label>
                <FieldRenderer field={field} value={val} onChange={(v) => onUpdate(field.key, v)} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const router = useRouter();

  const groups = getGroupsForSection(section);

  const [values, setValues] = useState<Record<string, any>>({});
  const [originals, setOriginals] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const allKeys = groups.flatMap((g) => g.fields.map((f) => f.key));

  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE}/contents/list?section=${section}`
      );
      if (!res.ok) throw new Error();
      const list = await res.json();
      const map: Record<string, any> = {};
      list.forEach((item: any) => {
        if (allKeys.includes(item.key)) {
          map[item.key] = item.value;
        }
      });
      setValues(map);
      setOriginals({ ...map });
    } catch {
      setValues({});
      setOriginals({});
    } finally {
      setLoading(false);
    }
  }, [section, allKeys.join(",")]);

  useEffect(() => {
    load();
  }, [load]);

  const updateValue = (key: string, val: any) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
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

  const anyChange = allKeys.some((k) => values[k] !== originals[k]);

  if (!groups.length) {
    return (
      <div className="p-6 md:p-8 text-center text-gray-500 py-16">
        <span className="material-symbols-outlined text-4xl mb-3 block">error_outline</span>
        Nessuna sezione configurata per questa pagina
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => router.push("/admin")}
              className="material-symbols-outlined text-blue-600 hover:opacity-70 transition-opacity"
            >
              arrow_back
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {SECTION_LABELS[section] || section}
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-9">
            {groups.length} sezioni · {allKeys.length} campi totali
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Salvato
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !anyChange}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? "Salvataggio..." : "Salva"}
          </button>
        </div>
      </div>

      {/* Groups */}
      {loading ? (
        <div className="text-center text-gray-500 py-16">
          <span className="material-symbols-outlined text-4xl mb-3 block animate-spin">progress_activity</span>
          Caricamento...
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              values={values}
              originals={originals}
              onUpdate={updateValue}
            />
          ))}
        </div>
      )}

      {/* Sticky save */}
      {anyChange && (
        <div className="sticky bottom-6 flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      )}
    </div>
  );
}