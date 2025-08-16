export function SectionHeader({ title, color = "white" }) {
  return (
    <>
      <h1 className={`text-${color} font-medium text-3xl`}>{title}</h1>
      <div className="flex items-center justify-center py-2 w-4/5 pb-4">
        <div className="border-t border-[var(--g-color)] w-full"></div>
      </div>
    </>
  );
}
