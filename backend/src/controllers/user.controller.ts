import type { Request, Response } from "express";
import { userService } from "../services/user.service.ts";
import { userSchema } from "../schemas/user.schema.ts";
import z from "zod";
import { AppError } from "../utils/app-error.ts";

export const userController = {
    // GET /users
    async findAll(_req: Request, res: Response) {
        const users = await userService.findAll();
        return res.status(200).json(users);
    },

    // POST /users
    async create(req: Request, res: Response) {
        try {
            const data = userSchema.parse(req.body);
            const user = await userService.create(data);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: z.flattenError(error).fieldErrors,
                });
            }
            if (error instanceof AppError) {
                return res
                    .status(error.statusCode)
                    .json({ message: error.message });
            }
            return res
                .status(500)
                .json({ message: "Erro interno do servidor" });
        }
    },

    // PUT /users/:id
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const data = userSchema.parse(req.body);
            const user = await userService.update(id, data);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: z.flattenError(error).fieldErrors,
                });
            }
            if (error instanceof AppError) {
                return res
                    .status(error.statusCode)
                    .json({ message: error.message });
            }
            return res
                .status(500)
                .json({ message: "Erro interno do servidor" });
        }
    },
};
