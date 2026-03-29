import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/layout/SearchPageClient";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Поиск",
  description: "Поиск по разделам сайта FCBMINSK, услугам и кейсам.",
};

export default function SearchPage() {
  const entries = buildSearchIndex();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-content px-4 section-y text-sub md:px-8">
          Загрузка…
        </div>
      }
    >
      <SearchPageClient entries={entries} />
    </Suspense>
  );
}
