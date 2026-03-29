import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Стать клиентом",
  description:
    "Оставьте заявку: расскажите о задаче и приложите бриф. Мы свяжемся для следующего шага.",
};

export default function ClientFormPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Стать клиентом</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Стать клиентом
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <p className="mt-4 text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
        Три шага: контакты, задача, бриф и согласие на обработку данных.
      </p>
      <div className="mt-10">
        <LeadForm />
      </div>
    </div>
  );
}
