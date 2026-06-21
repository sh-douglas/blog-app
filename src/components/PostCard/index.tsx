import { Link } from "react-router-dom";

import type { PostProps } from "../../types/post";
import { formatDate } from "../../utils/formatDate";

export function PostCard(post: PostProps) {
  return (
    <Link
      key={post.id}
      to={`/post/details/${post.id}`}
      className="group flex flex-col p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-2">
        <span className="text-slate-700 font-semibold">{post.author.name}</span>
        <span>•</span>
        <span>Publicado em: {formatDate(post.createdAt)}</span>
      </div>

      <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
        {post.title}
      </h2>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
        {post.content}
      </p>

      <div className="mt-auto pt-6 flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
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
  );
}
