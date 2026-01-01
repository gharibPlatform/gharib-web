// components/CreateKhatmaModal/FormField.jsx
export default function FormField({
  label,
  icon: Icon,
  error,
  children,
  optional = false,
}) {
  return (
    <div className="group">
      <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
        {Icon && (
          <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
            <Icon size={14} className="text-[var(--w-color)]" />
          </div>
        )}
        {label}
        {optional && (
          <span className="text-[var(--g-color)] text-sm font-normal ml-2">
            (Optional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-[var(--r-color)] text-sm mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[var(--r-color)] rounded-full"></div>
          {error}
        </p>
      )}
    </div>
  );
}
