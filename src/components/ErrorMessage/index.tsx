interface ErrorMessageProps {
  title?: string;
  subtitle?: string;
}

export function ErrorMessage({ title, subtitle }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-50 p-6 text-center space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-sm font-medium text-slate-500 tracking-wide">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
}
