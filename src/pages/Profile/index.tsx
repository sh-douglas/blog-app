import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  ArrowLeft,
  Camera,
  Shield,
  Mail,
  User,
  ShieldAlert,
  Pencil,
} from "lucide-react";

export function Profile() {
  const { user } = useAuth();
  const canAccessAdmin = user?.role === "editor" || user?.role === "director";

  return (
    <main className="w-full max-w-2xl mx-auto py-10 px-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Voltar para a página inicial
      </Link>

      <div className="bg-white p-8 md:p-10 border border-slate-100 rounded-3xl shadow-sm">
        <header className="flex flex-col items-center mb-8 border-b border-slate-100 pb-8">
          <div className="relative flex items-center justify-center w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-full mb-4 group cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-all">
            <Camera className="w-8 h-8 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
          <p className="text-sm text-slate-500">
            Visualize e prepare a edição dos seus dados
          </p>
        </header>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="flex items-center text-sm font-medium text-slate-700 mb-2"
              >
                <User className="w-4 h-4 mr-2 text-slate-400" />
                Nome Completo
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  defaultValue={user?.name}
                  disabled
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed focus:outline-none"
                />
                <Pencil className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-slate-700 mb-2"
              >
                <Mail className="w-4 h-4 mr-2 text-slate-400" />
                Endereço de Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed focus:outline-none"
                />
                <Pencil className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="flex items-center text-sm font-medium text-slate-700 mb-2"
              >
                <ShieldAlert className="w-4 h-4 mr-2 text-slate-400" />
                Nível de Acesso
              </label>
              <div className="relative">
                <input
                  id="role"
                  type="text"
                  defaultValue={user?.role}
                  disabled
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed select-none focus:outline-none"
                />
                <Pencil className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>

          {canAccessAdmin && (
            <div className="pt-6 mt-8 border-t border-slate-100">
              <Link
                to="/admin"
                className="flex items-center justify-center w-full px-4 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                <Shield className="w-5 h-5 mr-2" />
                Painel Administrativo
              </Link>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
