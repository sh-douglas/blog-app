import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import api from "../../api";
import type { PostFormData } from "../../schemas/post.schema";
import { PostForm } from "../../components/PostForm";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

export function EditPost() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostFormData>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function handleFindPost() {
      try {
        const response = await api.get(`/manage/posts/${id}`);
        setPost({
          title: response.data.title,
          content: response.data.content,
        });
        console.log(response.data);
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
    handleFindPost();
  }, [id]);

  async function handleEditPost(data: PostFormData) {
    try {
      await api.patch(`/manage/posts/${id}`, data);
      toast.success("Postagem editada com sucesso");
      navigate("/admin/drafts");
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
          title="Carregando postagens..."
          subtitle="Aguarde enquanto estamos realizando o carregamento das postagens"
        />
      </div>
    );
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
        <PostForm mode="edit" onSubmit={handleEditPost} initialData={post} />
      </div>
    </section>
  );
}
