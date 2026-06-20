import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { PostProps } from "../../types/post";
import api from "../../api";

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
      <div className="flex h-screen items-center justify-center">
        <Loading
          title="Carregando postagem..."
          subtitle="Aguarde enquanto estamos realizando o carregamento."
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Postagem não encontrada
        </h2>
        <Link
          to="/"
          className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto py-10 px-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar para a lista
      </Link>

      <article className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm">
        <header className="mb-8 border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-slate-500 gap-2 sm:gap-4">
            <span className="font-semibold text-slate-700">
              Autor: {post.author.name}
            </span>
            <span className="hidden sm:block">•</span>
            <span>Publicado em: {post.createdAt}</span>
            {post.updatedAt !== post.createdAt && (
              <>
                <span className="hidden sm:block">•</span>
                <span>Atualizado em: {post.updatedAt}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </main>
  );
}
