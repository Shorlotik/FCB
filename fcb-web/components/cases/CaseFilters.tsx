"use client";

import { Chip } from "@/components/ui/Chip";
import type { CaseStudy } from "@/lib/types";
import type { ServiceSlug } from "@/lib/types";
import { industriesFromCases } from "@/lib/cases";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  cases: CaseStudy[];
};

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  atl: "ATL",
  btl: "BTL",
  creative: "Creative",
  strategy: "Strategy",
  design: "Design",
  brand_id: "Brand ID",
  event: "Event",
  ooh: "OOH",
  pr: "PR",
  smm: "SMM",
};

export function CaseFilters({ cases }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const industry = searchParams.get("industry") ?? "";
  const service = searchParams.get("service") ?? "";

  const industries = useMemo(() => industriesFromCases(cases), [cases]);
  const services = useMemo(() => {
    const s = new Set<ServiceSlug>();
    cases.forEach((c) => c.services.forEach((x) => s.add(x)));
    return Array.from(s);
  }, [cases]);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }

  return (
    <div className="mb-10 space-y-6 rounded-[var(--radius-xl)] border border-brand-start/12 bg-elevated/95 p-6 shadow-[0_0_40px_-14px_rgb(0_180_255/0.1)] backdrop-blur-sm md:p-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sub">
          Отрасль
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip
            selected={industry === ""}
            onClick={() => setParam("industry", "")}
          >
            Все
          </Chip>
          {industries.map((ind) => (
            <Chip
              key={ind}
              selected={industry === ind}
              onClick={() =>
                setParam("industry", industry === ind ? "" : ind)
              }
            >
              {ind}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sub">
          Услуга
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip
            selected={service === ""}
            onClick={() => setParam("service", "")}
          >
            Все
          </Chip>
          {services.map((slug) => (
            <Chip
              key={slug}
              selected={service === slug}
              onClick={() =>
                setParam("service", service === slug ? "" : slug)
              }
            >
              {SERVICE_LABELS[slug]}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
