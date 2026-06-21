import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock, AlertCircle } from "lucide-react";
import type { PostProps } from "../../types/post";
import api from "../../api";

import { formatDate } from "../../utils/formatDate";

import { Loading } from "../../components/Loading";

export function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading
          title="Carregando postagem..."
          subtitle="Aguarde enquanto buscamos os detalhes do servidor."
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
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Voltar para a lista
      </Link>

      <article className="bg-white p-8 md:p-12 border border-slate-100 rounded-3xl shadow-sm">
        <header className="mb-10 border-b border-slate-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

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
          </div>
        </header>

        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </main>
  );
}
