import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FileText, FileEdit, Users, ArrowLeft } from "lucide-react";

export function Admin() {
  const { user } = useAuth();
  const isDirector = user?.role === "director";

  return (
    <main className="flex min-h-[80vh] flex-col w-full max-w-5xl mx-auto p-6">
      <div className="w-full mb-4">
        <Link
          to="/profile"
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para Perfil
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {user?.name || "Usuário não identificado"}
          </h1>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            {user?.role || "Cargo indefinido"}
          </h2>
        </header>

        <nav className="flex flex-wrap justify-center gap-6 max-w-4xl">
          <Link
            to="/admin/published"
            className="group flex w-48 h-48 flex-col items-center justify-center gap-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all"
          >
            <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:scale-110 transition-all">
              <FileText size={32} strokeWidth={2} />
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">
              Publicados
            </span>
          </Link>

          <Link
            to="/admin/drafts"
            className="group flex w-48 h-48 flex-col items-center justify-center gap-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 hover:-translate-y-1 transition-all"
          >
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:scale-110 transition-all">
              <FileEdit size={32} strokeWidth={2} />
            </div>
            <span className="font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">
              Rascunhos
            </span>
          </Link>

          {isDirector && (
            <Link
              to="/admin/users"
              className="group flex w-48 h-48 flex-col items-center justify-center gap-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 hover:-translate-y-1 transition-all"
            >
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110 transition-all">
                <Users size={32} strokeWidth={2} />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                Gerenciar Usuários
              </span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
