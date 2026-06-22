import type { Ref, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

const baseInputStyles =
  "p-4 bg-slate-100 border-none w-full rounded-xl block outline-none transition-all hover:bg-slate-200/70 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 placeholder:text-slate-400 text-black";

export function FormInput({
  ref,
  error,
  label,
  icon,
  rightElement,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label className="pl-2 text-sm font-bold text-slate-600">{label}</label>
      )}

      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-slate-400">{icon}</div>}

        <input
          {...props}
          ref={ref}
          className={`${baseInputStyles} ${icon ? "pl-12" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"} ${className || ""}`}
        />

        {rightElement && <div className="absolute right-4">{rightElement}</div>}
      </div>

      {error && (
        <span className="text-xs text-red-500 pl-2 font-medium">{error}</span>
      )}
    </div>
  );
}
