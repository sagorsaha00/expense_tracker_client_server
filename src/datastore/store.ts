import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export interface User extends Document {
    id: string;
    firstname?: string;
    lastname?: string;
    email: string;
}
export interface Token {
    accessToken: string
    refreshToken: string
}
interface State {
    user: null | User
    token: null | Token
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                token: null,
                setUser: (user) => set({ user }),
                setToken: (token: Token) => set({ token }),
                logout: () => set({ user: null, token: null }),
            }),
            {
                name: 'auth-storage',
            }
        )
    )
)