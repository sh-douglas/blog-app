import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
    email: z
      .string()
      .trim()
      .min(1, "Informe um e-mail")
      .email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve conter 6 caracteres ou mais."),
    confirmPassword: z
      .string()
      .min(6, "A senha deve conter 6 caracteres ou mais."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof registerSchema>;

export { registerSchema, type SignUpData };
