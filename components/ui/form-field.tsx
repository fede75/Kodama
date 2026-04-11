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
      <span className="block text-sm font-semibold text-paper/78">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-paper/38">{hint}</span> : null}
    </label>
  );
}
