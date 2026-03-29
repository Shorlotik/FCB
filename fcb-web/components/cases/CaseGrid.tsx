import type { CaseStudy } from "@/lib/types";
import { CaseCard } from "@/components/cases/CaseCard";

type Props = {
  cases: CaseStudy[];
};

export function CaseGrid({ cases }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))]">
      {cases.map((c) => (
        <li key={c.id}>
          <CaseCard item={c} />
        </li>
      ))}
    </ul>
  );
}
