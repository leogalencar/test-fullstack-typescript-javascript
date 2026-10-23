import type { User } from "../types/user";
import { formatDate } from "../utils/format-date";

interface UserListProps {
    users: User[];
    isLoading: boolean;
    editingUserId?: number | null;
    onEdit: (user: User) => void;
}

export function UserList({
    users,
    isLoading,
    editingUserId = null,
    onEdit,
}: UserListProps) {
    if (isLoading) {
        return (
            <div className="user-list-state">
                <p>Carregando usuários...</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="user-list-state">
                <p>Nenhum usuário cadastrado ainda.</p>
                <span>
                    Utilize o formulário ao lado para criar o primeiro usuário.
                </span>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Cargo / Função</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const isBeingEdited = editingUserId === user.id;
                        return (
                            <tr
                                key={user.id}
                                className={
                                    isBeingEdited ? "row-editing" : undefined
                                }
                            >
                                <td className="cell-id">#{user.id}</td>
                                <td className="cell-name">{user.name}</td>
                                <td className="cell-email">{user.email}</td>
                                <td>
                                    {user.role ? (
                                        <span className="role-badge">
                                            {user.role}
                                        </span>
                                    ) : (
                                        <span className="role-empty">—</span>
                                    )}
                                </td>
                                <td className="cell-date">
                                    {formatDate(user.createdAt)}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-edit"
                                        onClick={() => onEdit(user)}
                                    >
                                        {isBeingEdited
                                            ? "Editando..."
                                            : "Editar"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
