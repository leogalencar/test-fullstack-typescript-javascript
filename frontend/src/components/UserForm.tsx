import { useState, type SubmitEvent } from "react";
import type { User, UserFormData } from "../types/user";

interface UserFormProps {
    editingUser?: User | null;
    onSubmit: (data: UserFormData) => Promise<void>;
    onCancelEdit?: () => void;
}

export function UserForm({
    editingUser = null,
    onSubmit,
    onCancelEdit,
}: UserFormProps) {
    const [prevEditingUser, setPrevEditingUser] = useState<User | null>(
        editingUser,
    );
    const [name, setName] = useState(editingUser?.name ?? "");
    const [email, setEmail] = useState(editingUser?.email ?? "");
    const [role, setRole] = useState(editingUser?.role ?? "");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditing = Boolean(editingUser);

    // sincroniza o estado do formulario quando o usuario em edicao muda (padrao react 19 sem useeffect)
    if (editingUser !== prevEditingUser) {
        setPrevEditingUser(editingUser);
        setName(editingUser?.name ?? "");
        setEmail(editingUser?.email ?? "");
        setRole(editingUser?.role ?? "");
        setError(null);
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedRole = role.trim();

        if (!trimmedName) {
            setError("Nome é obrigatório");
            return;
        }

        if (!trimmedEmail) {
            setError("E-mail é obrigatório");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                name: trimmedName,
                email: trimmedEmail,
                role: trimmedRole || undefined,
            });

            // Limpa os campos apenas na criação (na edição o componente pai limpa editingUser)
            if (!isEditing) {
                setName("");
                setEmail("");
                setRole("");
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao salvar o usuário",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleCancel() {
        setError(null);
        setName("");
        setEmail("");
        setRole("");
        onCancelEdit?.();
    }

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Editar Usuário" : "Novo Usuário"}</h2>

            {error && (
                <div className="form-error" role="alert">
                    {error}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="user-name">Nome *</label>
                <input
                    id="user-name"
                    type="text"
                    placeholder="Ex: Mario Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="user-email">E-mail *</label>
                <input
                    id="user-email"
                    type="email"
                    placeholder="Ex: mario@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="user-role">Cargo / Função (opcional)</label>
                <input
                    id="user-role"
                    type="text"
                    placeholder="Ex: Desenvolvedor, Admin..."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Salvando..."
                        : isEditing
                          ? "Salvar Alterações"
                          : "Criar Usuário"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
