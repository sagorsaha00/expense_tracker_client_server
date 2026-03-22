import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export interface User extends Document {
    id: string,
    name?: string;
    email?: string;
    picture?: string;
    verifiedEmail?: boolean;
    createdAt?: Date;

}
export interface expense extends Document {
    _id: string;
    amount: string;
    title: string;
    date: string;


}
export interface Token {
    accessToken: string
    refreshToken: string
}
interface State {
    user: null | User
    token: null | Token
    expense: null | expense
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                token: null,
                expense: null,
                setexpense: (expense: expense) => set({ expense }),
                setUser: (user) => set({ user }),
                setToken: (token: Token) => set({ token }),
                logout: () => set({ user: null, token: null, expense: null }),
            }),
            {
                name: 'auth-storage',
            }
        )
    )
)