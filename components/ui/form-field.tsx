export function FormField({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2.5">
      <span className="block text-[0.92rem] font-semibold tracking-[0.01em] text-paper/84">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="block text-[0.92rem] leading-6 text-paper/48">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
