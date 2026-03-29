"use client";

import { CaseFilters } from "@/components/cases/CaseFilters";
import { CaseGrid } from "@/components/cases/CaseGrid";
import type { CaseStudy, ServiceSlug } from "@/lib/types";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  cases: CaseStudy[];
};

export function CasesExplorer({ cases }: Props) {
  const searchParams = useSearchParams();
  const industry = searchParams.get("industry") ?? "";
  const service = searchParams.get("service") ?? "";

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (industry && c.industry !== industry) return false;
      if (service && !c.services.includes(service as ServiceSlug)) return false;
      return true;
    });
  }, [cases, industry, service]);

  return (
    <>
      <CaseFilters cases={cases} />
      <CaseGrid cases={filtered} />
    </>
  );
}
