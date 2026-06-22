import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import type { PostProps } from "../../types/post";

import api from "../../api";

import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";
import { AdminPostCard } from "../../components/AdminPostCard";

export function DraftPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    async function getDraftPosts() {
      try {
        const response = await api.get("/manage/posts");
        setPosts(response.data);
      } catch (error) {
        let message = "Ocorreu um erro inesperado";

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.error || message;
        }

        toast.error(message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getDraftPosts();
  }, []);

  async function handlePublishPost(id: number) {
    try {
      await api.patch(`/manage/posts/${id}/publish`);
      toast.success("Post publicado com sucesso!");

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      let message = "Ocorreu um erro inesperado";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }

      toast.error(message);
    }
  }

  async function handleDeletePost(id: number) {
    try {
      await api.delete(`/manage/posts/${id}`);
      toast.success("Rascunho excluído com sucesso.");

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      let message = "Ocorreu um erro inesperado";

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
          title="Carregando rascunhos..."
          subtitle="Aguarde enquanto estamos buscando as postagens não publicadas."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <ErrorMessage
          title="Erro ao carregar rascunhos"
          subtitle="Tente novamente em instantes."
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
          Rascunhos
        </h1>
        <p className="text-base text-slate-500 max-w-2xl mx-auto">
          Faça a gestão dos posts não publicados da plataforma.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-700">
            Nenhum rascunho encontrado.
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Você não possui postagens aguardando publicação no momento.
          </p>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPosts.map((post) => (
              <AdminPostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
                onPublish={handlePublishPost}
              />
            ))}
          </section>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-5 py-2.5 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                Anterior
              </button>

              <span className="text-sm text-slate-600 font-medium">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
