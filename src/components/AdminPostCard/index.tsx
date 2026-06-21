import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Pencil, Trash2, ChevronRight } from "lucide-react";

import type { PostProps } from "../../types/post";
import { formatDate } from "../../utils/formatDate";

import { ConfirmModal } from "../ConfirmModal";

export function AdminPostCard(post: PostProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Funções de execução real após confirmação do modal
  function executeTogglePublish() {
    const action = post.published ? "Despublicar" : "Publicar";
    alert(`Ação executada: ${action} postagem ID ${post.id}`);
    setIsPublishModalOpen(false);
  }

  function handleEdit() {
    alert(`Ação solicitada: Editar postagem ID ${post.id}`);
  }

  function executeDelete() {
    alert(`Ação executada: Apagar postagem ID ${post.id}`);
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <article className="flex flex-col p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-2">
          <span className="text-slate-700 font-semibold">
            {post.author.name}
          </span>
          <span>•</span>
          <span>Publicado em: {formatDate(post.createdAt)}</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 line-clamp-1">
          {post.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {post.content}
        </p>

        <div className="pt-6 flex items-center justify-between border-t border-slate-50 mt-4">
          <Link
            to={`/post/details/${post.id}`}
            className="group flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Ver detalhes da postagem</span>
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <div className="flex items-center gap-1">
            {/* Botão de Publicação Dinâmico */}
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              title={post.published ? "Despublicar" : "Publicar"}
              className={`p-2 rounded-lg transition-colors ${
                post.published
                  ? "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                  : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {post.published ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={handleEdit}
              title="Editar"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              title="Apagar"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Modais de Confirmação */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Apagar postagem"
        message={`Deseja realmente apagar a postagem "${post.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Apagar"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isPublishModalOpen}
        title={post.published ? "Despublicar postagem" : "Publicar postagem"}
        message={
          post.published
            ? `Deseja remover a postagem "${post.title}" do ar? Ela ficará visível apenas nos rascunhos.`
            : `Deseja publicar a postagem "${post.title}"? Ela ficará visível para todos os usuários.`
        }
        confirmText={post.published ? "Despublicar" : "Publicar"}
        cancelText="Cancelar"
        variant={post.published ? "warning" : "primary"}
        onConfirm={executeTogglePublish}
        onCancel={() => setIsPublishModalOpen(false)}
      />
    </>
  );
}
