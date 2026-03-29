import { HomeHero } from "@/components/sections/HomeHero";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { CasesFeatured } from "@/components/sections/CasesFeatured";
import { getSiteMeta } from "@/lib/content";

export default function HomePage() {
  const site = getSiteMeta();

  return (
    <>
      <HomeHero
        tagline={site.tagline}
        neverFinished={site.neverFinished}
      />
      <section className="mx-auto max-w-content px-4 section-y md:px-8">
        <ServicesBento limit={6} />
      </section>
      <section className="mx-auto max-w-content px-4 pb-[var(--section-y)] md:px-8">
        <ClientsStrip />
      </section>
      <section className="mx-auto max-w-content border-t border-ink/10 bg-base px-4 section-y md:px-8">
        <CasesFeatured />
      </section>
    </>
  );
}
