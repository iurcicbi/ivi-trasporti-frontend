"use client";

import { useState, useRef } from "react";
import { getToken, API_BASE, API_ORIGIN } from "@/lib/api";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"upload" | "url">(value && !value.startsWith("blob:") ? "url" : "upload");

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `${API_BASE}/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Errore ${res.status}`);
      }
      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      alert(err.message || "Errore upload immagine");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleUrlSubmit = () => {
    const url = urlRef.current?.value?.trim();
    if (url) onChange(url);
  };

  const removeImage = () => {
    onChange("");
    if (urlRef.current) urlRef.current.value = "";
  };

  const isImageUrl = (v: string) =>
    v && (v.startsWith("/uploads/") || v.startsWith("http"));

  const fullUrl = value?.startsWith("/uploads/")
    ? `${API_ORIGIN}${value}`
    : value;

  return (
    <div className="space-y-sm">
      {/* Tabs */}
      <div className="flex gap-xs border-b border-outline-variant/20 mb-sm">
        <button
          onClick={() => setTab("upload")}
          className={`pb-xs text-label-sm font-label-sm transition-colors ${
            tab === "upload"
              ? "text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Carica File
        </button>
        <button
          onClick={() => setTab("url")}
          className={`pb-xs text-label-sm font-label-sm transition-colors ${
            tab === "url"
              ? "text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          URL
        </button>
      </div>

      {/* Upload tab */}
      {tab === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-lg text-center cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-outline-variant/40 hover:border-primary/50 hover:bg-surface"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-xs">
              <span className="material-symbols-outlined text-2xl text-primary animate-spin">
                progress_activity
              </span>
              <span className="text-body-sm text-on-surface-variant">Caricamento...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-xs">
              <span className="material-symbols-outlined text-2xl text-outline">cloud_upload</span>
              <span className="text-body-sm text-on-surface-variant">
                Trascina o clicca per caricare
              </span>
              <span className="text-body-xs text-outline">JPG, PNG, WebP, SVG, GIF, AVIF (max 10MB)</span>
            </div>
          )}
        </div>
      )}

      {/* URL tab */}
      {tab === "url" && (
        <div className="flex gap-xs">
          <input
            ref={urlRef}
            defaultValue={isImageUrl(value) ? value : ""}
            placeholder="https://..."
            className="flex-1 bg-surface border border-outline-variant/30 rounded-lg px-sm py-xs outline-none focus:border-primary transition-colors text-body-sm"
          />
          <button
            onClick={handleUrlSubmit}
            className="bg-surface-container-high text-on-surface-variant px-md py-xs rounded-lg text-label-sm font-label-sm hover:bg-surface-container transition-colors"
          >
            Applica
          </button>
        </div>
      )}

      {/* Preview */}
      {isImageUrl(value) && (
        <div className="relative group rounded-lg overflow-hidden border border-outline-variant/20">
          <img
            src={fullUrl}
            alt={label || "anteprima"}
            className="w-full h-32 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            onClick={removeImage}
            className="absolute top-xs right-xs w-6 h-6 bg-error text-on-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
