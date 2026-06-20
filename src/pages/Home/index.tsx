import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { PostProps } from "../../types/post";
import api from "../../api";

import { Loading } from "../../components/Loading";

export function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getPublishedPosts() {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getPublishedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading
          title="Carregando postagens..."
          subtitle="Aguarde enquanto estamos realizando o carregamento das postagens"
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-700">
          Sem publicações disponíveis no momento.
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Novos conteúdos serão exibidos assim que forem publicados.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-3xl mx-auto space-y-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/details/${post.id}`}
          className="group flex flex-col p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-2">
            <span className="text-slate-700 font-semibold">
              {post.author.name}
            </span>
            <span>•</span>
            <span>Publicado em: {post.createdAt}</span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
            {post.title}
          </h1>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {post.content}
          </p>

          <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
            <span>Ler postagem completa</span>
            <svg
              className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </section>
  );
}
