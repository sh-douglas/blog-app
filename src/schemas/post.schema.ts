import { z } from "zod";

const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(12, "O título deve conter no mínimo 12 caracteres."),
  content: z
    .string()
    .trim()
    .min(50, "O conteúdo deve conter no mínimo 50 caracteres."),
});

type PostFormData = z.infer<typeof postFormSchema>;

export { postFormSchema, type PostFormData };
