import { db } from "../db.ts";
import { AppError } from "../utils/app-error.ts";

export interface UserInput {
    name: string;
    email: string;
    role?: string | null;
}

export const userService = {
    async findAll() {
        return db.user.findMany({ orderBy: { createdAt: "desc" } });
    },

    async create(data: UserInput) {
        const emailExists = await db.user.findUnique({
            where: { email: data.email },
        });

        // validacao de email unico
        if (emailExists) {
            throw new AppError("E-mail já está em uso", 400);
        }

        return db.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role ?? null,
            },
        });
    },

    async update(id: number, data: UserInput) {
        const existingUser = await db.user.findUnique({
            where: { id },
        });

        // validacao de usuario existente
        if (!existingUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        if (data.email !== existingUser.email) {
            const emailTaken = await db.user.findUnique({
                where: { email: data.email },
            });

            // validacao de email unico
            if (emailTaken) {
                throw new AppError("E-mail já está em uso", 400);
            }
        }

        return db.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                role: data.role ?? null,
            },
        });
    },
};
