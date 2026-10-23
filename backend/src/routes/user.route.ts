import { Router } from "express";
import { userController } from "../controllers/user.controller.ts";

export const userRouter = Router();

// GET /users
userRouter.get("/", userController.findAll);

// POST /users
userRouter.post("/", userController.create);

// PUT /users/:id
userRouter.put("/:id", userController.update);
