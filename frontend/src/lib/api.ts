import type { ApiErrorResponse } from "../types/error";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json().catch(() => ({
            message: "Erro inesperado na comunicação com o servidor",
        }));

        // Extrai os erros especificos do Zod, se presente, ou usa a mensagem principal do backend
        const fieldMessages = errorData.errors
            ? Object.values(errorData.errors).flat().join(", ")
            : "";

        throw new Error(
            fieldMessages || errorData.message || "Erro na requisição",
        );
    }
    return response.json() as Promise<T>;
}
