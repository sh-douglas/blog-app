import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "../FormInput";

import { postFormSchema, type PostFormData } from "../../schemas/post.schema";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export function PostForm({ mode, initialData, onSubmit }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({ resolver: zodResolver(postFormSchema) });

  return (
    <section className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 md:p-10 border border-slate-100 rounded-3xl shadow-sm">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {mode === "create" ? "Criar nova postagem" : "Editar postagem"}
          </h2>
          <p className="text-sm text-slate-500">
            {mode === "create"
              ? "Preencha os dados abaixo para criar uma postagem"
              : "Preencha os dados abaixo para alterar uma postagem"}
          </p>
        </header>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="text"
            label="Título"
            placeholder="Digite o título da postagem..."
            {...register("title")}
            error={errors.title?.message}
            defaultValue={initialData?.title}
          />

          <FormInput
            type="text"
            label="Conteúdo"
            placeholder="Digite o conteúdo da postagem..."
            {...register("content")}
            error={errors.content?.message}
            defaultValue={initialData?.content}
          />

          <button
            type="submit"
            className="mt-4 h-14 w-full bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {mode === "create" ? "Criar" : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </section>
  );
}
