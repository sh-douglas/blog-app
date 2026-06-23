import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Pencil, Trash2, ChevronRight } from "lucide-react";

import type { PostProps } from "../../types/post";
import { formatDate } from "../../utils/formatDate";

import { ConfirmModal } from "../ConfirmModal";

interface AdminPostCardProps {
  post: PostProps;
  onDelete?: (id: number) => void | Promise<void>;
  onPublish?: (id: number) => void | Promise<void>;
  onUnpublish?: (id: number) => void | Promise<void>;
}

export function AdminPostCard({
  post,
  onDelete,
  onPublish,
  onUnpublish,
}: AdminPostCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  async function handleDeleteConfirm() {
    if (onDelete) {
      await onDelete(post.id);
    }
    setIsDeleteModalOpen(false);
  }

  async function handlePublishConfirm() {
    if (post.published) {
      if (onUnpublish) {
        await onUnpublish(post.id);
      }
    } else {
      if (onPublish) {
        await onPublish(post.id);
      }
    }
    setIsPublishModalOpen(false);
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
            to={`/admin/post/${post.id}`}
            className="group flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Ver detalhes da postagem</span>

            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <div className="flex items-center gap-1">
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
              title="Editar"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Link to={`/admin/edit/${post.id}`}>
                <Pencil className="w-4 h-4" />
              </Link>
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Apagar postagem"
        message={`Deseja realmente apagar a postagem "${post.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Apagar"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={handleDeleteConfirm}
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
        onConfirm={handlePublishConfirm}
        onCancel={() => setIsPublishModalOpen(false)}
      />
    </>
  );
}
