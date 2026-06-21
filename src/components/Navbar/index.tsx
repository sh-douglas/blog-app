import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BookOpen, User, LogOut, LogIn, UserPlus } from "lucide-react";

export function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <BookOpen className="text-indigo-600" size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Blogfolio
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-2 cursor-pointer"
              >
                <User size={18} />
                Perfil
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-2 cursor-pointer"
              >
                <LogIn size={18} />
                Entrar
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <UserPlus size={18} />
                Criar conta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
