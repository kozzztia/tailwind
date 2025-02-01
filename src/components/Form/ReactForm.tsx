import { useState } from "react";
import styles from "./styles.module.css";
import { mockUsers } from "./helpers"; // Импортируем пользователей

const ReactForm = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<{ login?: string; password?: string } | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setError(null); // Очищаем ошибки перед валидацией

        const formData = new FormData(e.currentTarget);
        const login = formData.get("login")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        // Проверка на пустые поля
        const newErrors: { login?: string; password?: string } = {};
        if (!login) newErrors.login = "Login is required";
        if (!password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setPending(false);
            return;
        }

        // Проверка логина и пароля
        const user = mockUsers.find(user => user.name === login && user.password === password);
        if (!user) {
            setError({ login: "Invalid login or password" });
            setPending(false);
            return;
        }

        // Если успешный вход, переходим в Success
        setTimeout(() => {
            setPending(false);
            setOpen(true);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            {!open ? <LoginForm handler={handleSubmit} pending={pending} error={error} /> : <h1>Success</h1>}
        </div>
    );
};

const LoginForm: React.FC<{ handler: (e: React.FormEvent<HTMLFormElement>) => void; pending: boolean; error: { login?: string; password?: string } | null }> = ({ pending, error, handler }) => {
    return (
        <div className={styles.container}>
            <form onSubmit={handler} className={styles.form}>
                <label>
                    <span className={error?.login ? styles.error : ""}>{error?.login || "Login"}</span>
                    <input type="text" name="login" autoComplete="none"/>
                </label>
                <label>
                    <span className={error?.password ? styles.error : ""}>{error?.password || "Password"}</span>
                    <input type="password" name="password" autoComplete="none"/>
                </label>
                <button type="submit" disabled={pending}>{pending ? "Pending..." : "Submit"}</button>
            </form>
        </div>
    );
};

export default ReactForm;
