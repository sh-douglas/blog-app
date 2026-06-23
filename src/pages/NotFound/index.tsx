import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

export function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-md">
        {/* Ícone Indicativo */}
        <div className="p-4 rounded-full bg-slate-100 text-slate-500 mb-6">
          <FileQuestion size={48} strokeWidth={1.5} />
        </div>

        {/* Mensagem de Erro */}
        <h1 className="text-4xl font-black text-slate-950 mb-3 tracking-tight">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Página não encontrada
        </h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          O link que você tentou acessar não existe ou a página pode ter sido
          removida permanentemente.
        </p>

        {/* Link de Retorno */}
        <Link
          to="/"
          className="inline-flex items-center justify-center h-12 px-6 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
