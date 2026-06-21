import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "primary";
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  variant = "primary",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-amber-600 hover:bg-amber-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      {/* Contêiner do Modal */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <header className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {message}
          </p>

          <footer className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${variantStyles[variant]}`}
            >
              {confirmText}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
