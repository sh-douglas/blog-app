import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { ArrowLeft, User as UserIcon, Mail, Shield, Save } from "lucide-react";

import type { User } from "../../types/auth";

import api from "../../api";
import { Loading } from "../../components/Loading";

type ManageableRole = "reader" | "editor";

interface UserCardProps {
  user: User;
  onUpdateRole: (userId: number, role: ManageableRole) => Promise<void>;
}

function UserCard({ user, onUpdateRole }: UserCardProps) {
  const [selectedRole, setSelectedRole] = useState<string>(user.role);
  const [isSaving, setIsSaving] = useState(false);

  const isDirector = user.role === "director";
  const hasChanged = selectedRole !== user.role && !isDirector;

  async function handleSave() {
    if (!hasChanged) return;

    setIsSaving(true);
    await onUpdateRole(user.id, selectedRole as ManageableRole);
    setIsSaving(false);
  }

  return (
    <article className="flex flex-col p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
      <header className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <UserIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-slate-900 line-clamp-1">
            {user.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail className="w-4 h-4" />
          <span className="line-clamp-1">{user.email}</span>
        </div>
      </header>

      <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`role-${user.id}`}
            className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" />
            Nível de Acesso
          </label>
          <select
            id={`role-${user.id}`}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={isDirector || isSaving}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <option value="reader">Leitor</option>
            <option value="editor">Editor</option>
            {isDirector && <option value="director">Diretor</option>}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanged || isSaving}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Salvando..." : "Salvar Alteração"}
        </button>
      </div>
    </article>
  );
}

export function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        let message = "Ocorreu um erro inesperado!";

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.error || message;
        }

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
    getAllUsers();
  }, []);

  async function updateUserRole(userId: number, role: ManageableRole) {
    try {
      const response = await api.patch(`/users/${userId}/role`, { role });
      const updatedUser = response.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      let message = "Ocorreu um erro inesperado!";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }

      toast.error(message);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading
          title="Carregando usuários..."
          subtitle="Aguarde enquanto estamos carregando os usuários cadastrados."
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-6">
      <div className="mb-4">
        <Link
          to="/admin"
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para o menu
        </Link>
      </div>

      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Gerenciar Usuários
        </h1>
        <p className="text-base text-slate-500 max-w-2xl mx-auto">
          Altere as permissões de acesso dos usuários da plataforma.
        </p>
      </header>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-700">
            Nenhum usuário encontrado.
          </h2>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onUpdateRole={updateUserRole} />
          ))}
        </section>
      )}
    </div>
  );
}
