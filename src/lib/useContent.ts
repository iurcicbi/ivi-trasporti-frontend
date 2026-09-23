"use client";

import { useState, useEffect } from 'react';
import { fetchContents } from '@/lib/api';

// Cache semplice per evitare richieste duplicate
const contentCache = new Map<string, { data: Record<string, any>, timestamp: number }>();
const CACHE_DURATION = 30000; // 30 secondi cache

export function useContent(section?: string) {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const cacheKey = section || 'default';
    
    // Controlla se abbiamo dati in cache validi
    const cached = contentCache.get(cacheKey);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      if (mounted) {
        setContent(cached.data);
        setLoading(false);
        setError(null);
      }
      return;
    }
    
    setLoading(true);
    setError(null);
    
    fetchContents(section)
      .then((data) => {
        if (mounted) {
          setContent(data || {});
          setError(null);
          // Salva in cache
          contentCache.set(cacheKey, { data: data || {}, timestamp: now });
        }
      })
      .catch((err) => {
        if (mounted) {
          setContent({});
          setError(err.message || 'Errore nel caricamento contenuti');
          console.warn('Errore caricamento contenuti:', err.message, '- usando fallback statici');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    
    return () => { mounted = false; };
  }, [section]);

  const get = (key: string, fallback: any = ''): any => {
    const value = content[key];
    // Ritorna il valore solo se è definito e non è stringa vuota
    // Se è stringa vuota o undefined/null, usa il fallback
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
    return fallback;
  };

  return { content, get, loading, error };
}
