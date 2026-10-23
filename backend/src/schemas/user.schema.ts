import * as z from "zod";

export const userSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório"),
    email: z.email("Formato de e-mail inválido"),
    role: z.string().optional(),
});
