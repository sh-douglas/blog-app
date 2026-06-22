import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { type SignUpData, registerSchema } from "../../schemas/register.schema";

import axios from "axios";
import api from "../../api";

import { FormInput } from "../../components/FormInput";
import { useState } from "react";
import { EyeOff, User, Mail, Lock, Eye } from "lucide-react";

export function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({ resolver: zodResolver(registerSchema) });

  async function HandleRegister(data: SignUpData) {
    try {
      await api.post("/auth/register", data);
      toast.success("Conta criada com sucesso.");
      navigate("/login");
    } catch (error) {
      let message = "Ocorreu um erro inesperado!";

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
            Criar nova conta
          </h1>
          <p className="text-sm text-slate-500">
            Preencha os dados abaixo para realizar o seu cadastro e ter acesso à
            plataforma.
          </p>
        </header>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(HandleRegister)}
        >
          <FormInput
            type="text"
            label="Nome"
            placeholder="Digite o seu nome..."
            icon={<User size={20} />}
            {...register("name")}
            error={errors.name?.message}
          />

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

          <FormInput
            type={showPassword ? "text" : "password"}
            label="Confirme sua senha"
            placeholder="Repita a senha..."
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
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message} // Correção aplicada aqui
          />

          <button
            type="submit"
            className="mt-4 h-14 w-full bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-1">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-slate-800 font-bold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
