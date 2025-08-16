export function FormInput({
  id,
  label,
  value,
  onChange,
  error,
  isDirty,
  type = "text",
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[var(--g-color)] mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-72 bg-[var(--bg-color)] border ${
          error && isDirty
            ? "border-[var(--r-color)]"
            : "border-[var(--g-color)]"
        } rounded-[4px] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--main-color)]`}
        placeholder={placeholder}
      />
      {isDirty && error && (
        <p className="text-[var(--r-color)] text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
