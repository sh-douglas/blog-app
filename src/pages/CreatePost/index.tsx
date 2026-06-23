import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../../api";
import type { PostFormData } from "../../schemas/post.schema";
import { PostForm } from "../../components/PostForm";
import { ArrowLeft } from "lucide-react";

export function CreatePost() {
  const navigate = useNavigate();

  async function handleCreatePost(data: PostFormData) {
    try {
      await api.post("/posts", data);
      toast.success("Postagem criada com sucesso");
      navigate("/admin/drafts");
    } catch (error) {
      let message = "Ocorreu um erro inesperado!";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }

      toast.error(message);
    }
  }

  return (
    <section className="flex flex-col min-h-screen items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link
            to="/admin"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Voltar para o menu
          </Link>
        </div>
        <PostForm mode="create" onSubmit={handleCreatePost} />
      </div>
    </section>
  );
}
