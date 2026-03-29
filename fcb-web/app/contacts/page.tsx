import type { Metadata } from "next";
import Link from "next/link";
import { ContactsMap } from "@/components/contacts/ContactsMap";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { getContactGroups, getSiteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Телефон, email и контакты по направлениям: СМИ, HR, новые клиенты.",
};

export default function ContactsPage() {
  const site = getSiteMeta();
  const groups = getContactGroups();

  return (
    <>
      <LocalBusinessJsonLd />
      <div className="border-b border-ink/[0.06] bg-elevated mesh-hero grain-hero">
        <div className="mx-auto max-w-content px-4 section-y md:px-8">
          <nav className="text-xs text-sub" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-ink">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Контакты</span>
          </nav>
          <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
            Контактная информация FCBMINSK
          </h1>
          <div className="heading-rule mt-5" aria-hidden />
        </div>
        <section className="bg-accent-contact px-4 py-16 text-elevated md:px-8 md:py-20">
          <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2">
            <div>
              <p className="text-lg text-white/90">
                Общий телефон и почта — для первого контакта. Ниже — прямые
                адреса по задачам.
              </p>
              {site.address ? (
                <p className="mt-4 text-sm text-white/85">
                  {site.address.street}, {site.address.city},{" "}
                  {site.address.postalCode}, {site.address.country}
                </p>
              ) : null}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="mt-6 block text-2xl font-bold hover:underline"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.emails.info}`}
                className="mt-2 block text-lg hover:underline"
              >
                {site.emails.info}
              </a>
              <a
                href={`mailto:${site.emails.hr}`}
                className="mt-1 block text-lg hover:underline"
              >
                {site.emails.hr}
              </a>
              <p className="mt-8">
                <Link
                  href="/client"
                  className="font-semibold text-white underline-offset-4 hover:underline"
                >
                  Стать клиентом →
                </Link>
              </p>
            </div>
            <div className="space-y-10">
              {groups.map((g) => (
                <div key={g.id}>
                  <h2 className="font-display text-h4 font-bold">{g.title}</h2>
                  <ul className="mt-4 space-y-4">
                    {g.people.map((p) => (
                      <li key={p.email}>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-white/80">{p.role}</p>
                        <a
                          href={`mailto:${p.email}`}
                          className="text-sm font-semibold text-white underline-offset-2 hover:underline"
                        >
                          {p.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-content px-4 section-y md:px-8">
          <h2 className="font-display text-h3 font-bold text-ink">
            Как нас найти
          </h2>
          <div className="heading-rule mt-4" aria-hidden />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sub">
            Офис в бизнес-центре Forum Plaza. Карта для ориентира; точное
            расположение уточняйте при визите.
          </p>
          <div className="mt-8 max-w-4xl">
            <ContactsMap />
          </div>
        </section>
      </div>
    </>
  );
}
