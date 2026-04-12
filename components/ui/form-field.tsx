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
    <label className="block space-y-2">
      <span className="block text-[0.95rem] font-semibold text-paper/82">{label}</span>
      {children}
      {hint ? <span className="block text-sm leading-6 text-paper/46">{hint}</span> : null}
    </label>
  );
}
