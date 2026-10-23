import { useEffect, useState } from "react";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";
import { userService } from "./services/user.service";
import type { User, UserFormData } from "./types/user";

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        userService
            .findAll()
            .then((data) => {
                if (!ignore) {
                    setUsers(data);
                    setLoadError(null);
                }
            })
            .catch((err: unknown) => {
                if (!ignore) {
                    setLoadError(
                        err instanceof Error
                            ? err.message
                            : "Não foi possível carregar os usuários",
                    );
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, []);

    async function handleRetryLoad() {
        setIsLoading(true);
        setLoadError(null);
        try {
            const data = await userService.findAll();
            setUsers(data);
        } catch (err) {
            setLoadError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível carregar os usuários",
            );
        } finally {
            setIsLoading(false);
        }
    }

    function showSuccess(message: string) {
        setSuccessMessage(message);
        window.setTimeout(() => {
            setSuccessMessage((current) =>
                current === message ? null : current,
            );
        }, 3500);
    }

    async function handleFormSubmit(data: UserFormData) {
        if (editingUser) {
            const updated = await userService.update(editingUser.id, data);
            setUsers((prev) =>
                prev.map((user) => (user.id === updated.id ? updated : user)),
            );
            setEditingUser(null);
            showSuccess("Usuário atualizado com sucesso!");
        } else {
            const created = await userService.create(data);
            setUsers((prev) => [created, ...prev]);
            showSuccess("Usuário criado com sucesso!");
        }
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div>
                    <h1>Gerenciamento de Usuários</h1>
                    <p>Cadastre, visualize e atualize os usuários do sistema</p>
                </div>
                <span className="user-count-badge">
                    {users.length} {users.length === 1 ? "usuário" : "usuários"}
                </span>
            </header>

            {successMessage && (
                <div className="alert-success" role="status">
                    {successMessage}
                </div>
            )}

            <main className="app-main">
                <section className="card form-section">
                    <UserForm
                        editingUser={editingUser}
                        onSubmit={handleFormSubmit}
                        onCancelEdit={() => setEditingUser(null)}
                    />
                </section>

                <section className="card list-section">
                    <div className="list-header">
                        <h2>Lista de Usuários</h2>
                        <button
                            type="button"
                            className="btn-refresh"
                            onClick={handleRetryLoad}
                            disabled={isLoading}
                        >
                            Atualizar
                        </button>
                    </div>

                    {loadError ? (
                        <div className="load-error" role="alert">
                            <p>{loadError}</p>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={handleRetryLoad}
                            >
                                Tentar novamente
                            </button>
                        </div>
                    ) : (
                        <UserList
                            users={users}
                            isLoading={isLoading}
                            editingUserId={editingUser?.id ?? null}
                            onEdit={(user) => setEditingUser(user)}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
