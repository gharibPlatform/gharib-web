import clsx from "clsx";

export function ActionButton({
  label,
  value,
  error,
  isDisabled = true,
  isDirty,
  destructive = false,
  onClick,
  className,
}) {
  const disabled = isDisabled || !value || !!error || !isDirty;

  return (
    <button
      className={clsx(
        "mt-2 px-4 py-2 flex justify-center items-center rounded-[4px] border whitespace-nowrap",
        disabled && "opacity-50 cursor-not-allowed",
        destructive
          ? "bg-[var(--r-color)] text-[var(--w-color)] border-[var(--r-color)] hover:bg-[var(--bright-r-color)]"
          : "bg-[var(--main-color)] text-[var(--w-color)] border-[var(--g-color)] hover:bg-[var(--main-color-hover)]",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
