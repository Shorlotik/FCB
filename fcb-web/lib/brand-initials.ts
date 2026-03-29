/** Две буквы для карточки бренда (не логотип). */
export function brandInitials(name: string): string {
  const cleaned = name.replace(/[.\-_]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
  }
  const w = parts[0] ?? name;
  return w.slice(0, 2).toUpperCase();
}
