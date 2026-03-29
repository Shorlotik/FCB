type Props = {
  steps: string[];
  current: number;
};

export function FormStepper({ steps, current }: Props) {
  return (
    <ol className="mb-8 flex flex-wrap gap-2" aria-label="Прогресс формы">
      {steps.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-shadow duration-motion ${
              i <= current
                ? "bg-ink text-elevated shadow-[0_0_20px_-4px_rgb(0_180_255/0.45)]"
                : "border border-ink/12 bg-elevated/90 text-sub backdrop-blur-sm"
            }`}
            aria-current={i === current ? "step" : undefined}
          >
            {i + 1}
          </span>
          <span
            className={`hidden text-sm sm:inline ${i === current ? "font-semibold text-ink" : "text-sub"}`}
          >
            {label}
          </span>
          {i < steps.length - 1 ? (
            <span className="hidden text-sub sm:inline" aria-hidden>
              /
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
