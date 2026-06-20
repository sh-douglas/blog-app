import z from "zod";

const loginSchema = z.object({
  email: z.string().trim().min(1, "O e-mail é obrigatório.").email(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

type SignInData = z.infer<typeof loginSchema>;

export { loginSchema, type SignInData };
