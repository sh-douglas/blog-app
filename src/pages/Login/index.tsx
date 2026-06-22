import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { type SignInData, loginSchema } from "../../schemas/login.schema";

import axios from "axios";

import { FormInput } from "../../components/FormInput";
import { useState } from "react";
import { EyeOff, Mail, Lock, Eye } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({ resolver: zodResolver(loginSchema) });

  async function HandleLogin(data: SignInData) {
    try {
      await signIn(data);
      toast.success("Login realizado com sucesso.");
      navigate("/profile");
    } catch (error) {
      let message = "Ocorreu um erro inesperado!";

      console.log(error);

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || message;
      }

      toast.error(message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 md:p-10 border border-slate-100 rounded-3xl shadow-sm">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Entre em sua conta
          </h1>
          <p className="text-sm text-slate-500">
            Preencha os dados abaixo para realizar o login e ter acesso à
            plataforma.
          </p>
        </header>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(HandleLogin)}
        >
          <FormInput
            type="email"
            label="E-mail"
            placeholder="Digite o seu email..."
            icon={<Mail size={20} />}
            {...register("email")}
            error={errors.email?.message}
          />

          <FormInput
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="Digite uma senha..."
            icon={<Lock size={20} />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="mt-4 h-14 w-full bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-1">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-slate-800 font-bold hover:underline"
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </main>
  );
}
