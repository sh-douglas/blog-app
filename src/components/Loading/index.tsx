interface LoadingProps {
  title?: string;
  subtitle?: string;
}

export function Loading({ title, subtitle }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-50 p-6 text-center space-y-6">
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute w-full h-full border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

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
