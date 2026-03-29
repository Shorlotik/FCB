import { getSiteMeta } from "@/lib/content";

/**
 * Статичная карта OpenStreetMap (без ключей API). Центр и bbox из `site.json` → `geo`.
 */
export function ContactsMap() {
  const site = getSiteMeta();
  const g = site.geo;
  const bbox = g
    ? [
        g.lon - 0.009,
        g.lat - 0.007,
        g.lon + 0.009,
        g.lat + 0.007,
      ]
        .map((n) => n.toFixed(4))
        .join(",")
    : "27.52,53.88,27.62,53.95";

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik`;

  const mapLink =
    g != null
      ? `https://www.openstreetmap.org/?mlat=${g.lat}&mlon=${g.lon}#map=17/${g.lat}/${g.lon}`
      : "https://www.openstreetmap.org/#map=12/53.90/27.56";

  const line =
    site.address != null
      ? `${site.address.street}, ${site.address.city}`
      : "Минск";

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-ink/[0.08] bg-muted shadow-card">
      <iframe
        title={`Карта: ${site.address?.city ?? "Минск"}`}
        src={src}
        className="aspect-[4/3] min-h-[280px] w-full border-0 grayscale-[15%] contrast-[1.05] md:aspect-[16/9] md:min-h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="border-t border-ink/[0.08] px-4 py-3 text-xs leading-relaxed text-sub">
        {line}
        {" · "}
        <a
          href={mapLink}
          className="font-medium text-brand-start underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть в OpenStreetMap
        </a>
      </p>
    </div>
  );
}
