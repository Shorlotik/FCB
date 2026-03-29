import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { NavDesktop } from "@/components/layout/NavDesktop";
import { NavMobile } from "@/components/layout/NavMobile";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { buildSearchIndex } from "@/lib/search-index";

export function SiteHeader() {
  const searchEntries = buildSearchIndex();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-start/15 bg-elevated/92 shadow-[0_1px_0_rgb(255_255_255/0.55)_inset,0_8px_32px_-8px_rgb(0_180_255/0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-elevated/88">
      <div className="mx-auto flex min-w-0 max-w-content items-center gap-3 px-4 py-3.5 sm:gap-4 md:px-8 md:py-4">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="hidden min-w-0 flex-1 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] xl:block">
          <NavDesktop />
        </div>
        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-2 xl:flex xl:gap-3">
            <SearchDialog entries={searchEntries} />
            <Button href="/client" variant="secondary" className="!px-4 !py-2 !text-xs md:!text-sm">
              Стать клиентом
            </Button>
            <Button href="/work" className="!px-4 !py-2 !text-xs md:!text-sm">
              Работа у нас
            </Button>
          </div>
          <div className="xl:hidden">
            <NavMobile searchEntries={searchEntries} />
          </div>
        </div>
      </div>
    </header>
  );
}
