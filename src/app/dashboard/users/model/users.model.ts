export interface User {
    id: number | null;
    username: string | null;
    email: string | null;
    password: string | null;
    token: string;
    role: string | null;
}