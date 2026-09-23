"use client";

import { useState, useRef } from "react";
import { getToken } from "@/lib/api";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  accept?: string;
  apiEndpoint?: string;
}

export default function FileUpload({
  value,
  onChange,
  label,
  accept = ".pdf",
  apiEndpoint = "pdf",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append(apiEndpoint === "pdf" ? "pdf" : "file", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/upload/${apiEndpoint}`,
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
      alert(err.message || "Errore upload file");
    } finally {
      setUploading(false);
    }
  };

  const remove = () => {
    onChange("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const fullUrl = value?.startsWith("/uploads/")
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${value}`
    : value;

  return (
    <div className="space-y-sm">
      {/* Upload area */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-outline-variant/40 hover:border-primary/50 hover:bg-surface rounded-xl p-lg text-center cursor-pointer transition-all"
      >
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
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
            <span className="material-symbols-outlined text-2xl text-outline">description</span>
            <span className="text-body-sm text-on-surface-variant">
              {value ? "Clicca per cambiare file" : `Carica ${accept.toUpperCase()}`}
            </span>
          </div>
        )}
      </div>

      {/* File info */}
      {value && (
        <div className="flex items-center justify-between bg-surface-container-high rounded-lg px-md py-sm">
          <div className="flex items-center gap-sm min-w-0">
            <span className="material-symbols-outlined text-outline text-lg">description</span>
            <span className="text-body-sm text-on-surface-variant truncate">{fullUrl}</span>
          </div>
          <button
            onClick={remove}
            className="text-error hover:opacity-70 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
