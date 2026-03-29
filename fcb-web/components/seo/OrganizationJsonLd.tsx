import { getSiteMeta } from "@/lib/content";

export function OrganizationJsonLd() {
  const site = getSiteMeta();
  const payload = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.tagline,
    telephone: site.phone,
    email: site.emails.info,
    url: site.url,
    ...(site.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }
      : {}),
    ...(site.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.geo.lat,
            longitude: site.geo.lon,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
