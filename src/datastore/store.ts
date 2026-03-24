import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
    verifiedEmail?: boolean;
    createdAt?: string;
}

export interface ExpenseItem {
    _id: string;
    amount: string;
    title: string;
    date: string;
}

export interface Token {
    accessToken: string;
    refreshToken: string;
}

interface State {
    user: User | null;
    token: Token | null;
    expense: ExpenseItem[] | null;
    setUser: (user: User) => void;
    setToken: (token: Token) => void;
    setExpense: (expense: ExpenseItem[]) => void;
    setAuth: (user: User, token: Token) => void;
    updateAccessToken: (accessToken: string) => void;

    logout: () => void;
}

export const useAuthStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                token: null,
                expense: null,

                setUser: (user) => set({ user }),
                setToken: (token) => set({ token }),
                setExpense: (expense) => set({ expense }),
                setAuth: (user, token) => set({ user, token }),
                updateAccessToken: (accessToken) =>
                    set((state) => ({
                        token: state.token
                            ? {
                                ...state.token,
                                accessToken,
                            }
                            : null,
                    })),

                logout: () =>
                    set({
                        user: null,
                        token: null,
                        expense: null,
                    }),
            }),
            {
                name: "auth-storage",
            }
        )
    )
);