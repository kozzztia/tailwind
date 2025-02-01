import { useState } from "react";
import styles from "./styles.module.css";
import { mockUsers } from "./helpers"; // Импортируем пользователей

const ReactForm = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<{ login?: string; password?: string; message?: string } | null>(null);

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
            setError({ message: "Invalid login or password" });
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

const LoginForm: React.FC<{ handler: (e: React.FormEvent<HTMLFormElement>) => void; pending: boolean; error: { login?: string; password?: string; message?: string } | null }> = ({ pending, error, handler }) => {
    return (
        <div className={styles.container}>
            <form onSubmit={handler} className={styles.form}>
                <label>
                    <span className={error?.login ? styles.error : ""}>{error?.login || "Login"}</span>
                    <Input name="login" type="text" />
                </label>
                <label>
                    <span className={error?.password ? styles.error : ""}>{error?.password || "Password"}</span>
                    <Input name="password" type="password" />
                </label>
                <button type="submit" disabled={pending} className={styles.button + (error?.message ? " " + styles.error : "")}>
                    {pending ? "Pending..." : error?.message || "Submit"}</button>
            </form>
        </div>
    );
};

const Input: React.FC<{ name: string; type: string }> = ({ name, type }) => {
    const [toched, setToched] = useState<boolean>(false);
    return (
    <input 
        onBlur={() => setToched(true)} 
        name={name} 
        type={type} 
        autoComplete="off"
        className={toched ? styles.toched : ""}
        />
    )
};

export default ReactForm;
