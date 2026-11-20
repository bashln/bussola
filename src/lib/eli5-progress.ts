const STORAGE_KEY = "bussola-eli5-read";

export function readEli5Progress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function markEli5Read(slug: string): string[] {
  const current = readEli5Progress();
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("bussola-eli5-progress"));
  } catch {
    // ignore storage errors
  }
  return next;
}
