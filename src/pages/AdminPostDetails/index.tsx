import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  AlertCircle,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";

import type { PostProps } from "../../types/post";
import api from "../../api";
import { formatDate } from "../../utils/formatDate";

import { Loading } from "../../components/Loading";
import { ConfirmModal } from "../../components/ConfirmModal";

export function AdminPostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  useEffect(() => {
    async function getPostDetail() {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    }

    getPostDetail();
  }, [id]);

  async function handleDeleteConfirm() {
    try {
      await api.delete(`/manage/posts/${id}`);
      toast.success("Postagem apagada com sucesso.");
      navigate("/admin");
    } catch (error) {
      let message = "Ocorreu um erro ao apagar.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }
      toast.error(message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  }

  async function handlePublishConfirm() {
    if (!post) return;

    try {
      if (post.published) {
        await api.patch(`/manage/posts/${id}/unpublish`);
        toast.success("Postagem despublicada com sucesso.");
        setPost({ ...post, published: false });
      } else {
        await api.patch(`/manage/posts/${id}/publish`);
        toast.success("Postagem publicada com sucesso.");
        setPost({ ...post, published: true });
      }
    } catch (error) {
      let message = "Ocorreu um erro inesperado.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }
      toast.error(message);
    } finally {
      setIsPublishModalOpen(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading
          title="Carregando postagem..."
          subtitle="Aguarde enquanto buscamos os detalhes no servidor."
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400" />
        <h2 className="text-2xl font-bold text-slate-800">
          Postagem não encontrada
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>
      </div>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Voltar
      </button>

      <article className="bg-white p-8 md:p-12 border border-slate-100 rounded-3xl shadow-sm">
        <header className="mb-10 border-b border-slate-100 pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight flex-1">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                title={post.published ? "Despublicar" : "Publicar"}
                className={`p-2.5 rounded-lg transition-colors ${
                  post.published
                    ? "text-slate-500 hover:text-amber-600 hover:bg-amber-100"
                    : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                {post.published ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>

              <Link
                to={`/admin/edit/${post.id}`}
                title="Editar"
                className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                title="Apagar"
                className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center text-sm text-slate-500 gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-slate-700">
                {post.author.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            {post.updatedAt !== post.createdAt && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Atualizado: {formatDate(post.updatedAt)}</span>
              </div>
            )}

            <div
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                post.published
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {post.published ? "Publicado" : "Rascunho"}
            </div>
          </div>
        </header>

        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      {post && (
        <>
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
            title={
              post.published ? "Despublicar postagem" : "Publicar postagem"
            }
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
      )}
    </main>
  );
}
