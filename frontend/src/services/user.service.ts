import { API_URL, handleResponse } from "../lib/api";
import type { User, UserFormData } from "../types/user";

export const userService = {
    // GET /users
    async findAll(): Promise<User[]> {
        const response = await fetch(`${API_URL}/users`);
        return handleResponse<User[]>(response);
    },

    // POST /users
    async create(data: UserFormData): Promise<User> {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse<User>(response);
    },

    // PUT /users/:id
    async update(id: number, data: UserFormData): Promise<User> {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse<User>(response);
    },
};
