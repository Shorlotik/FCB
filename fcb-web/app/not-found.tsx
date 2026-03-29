import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="border-b border-ink/[0.06] mesh-hero grain-hero">
      <div className="mx-auto flex min-h-[62vh] max-w-content flex-col items-center justify-center px-4 py-16 text-center md:px-8 md:py-24">
        <p className="font-display text-7xl font-extrabold tracking-tight text-gradient-fcb md:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-display text-display-lg font-bold text-ink">
          Страница не найдена
        </h1>
        <div className="heading-rule mx-auto mt-5" aria-hidden />
        <p className="mt-6 max-w-md text-base leading-relaxed text-sub md:text-lg">
          Ссылка устарела или адрес введён с ошибкой. Вернитесь на главную или в
          раздел услуг.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Главная</Button>
          <Button href="/services" variant="secondary">
            Услуги
          </Button>
        </div>
      </div>
    </div>
  );
}
