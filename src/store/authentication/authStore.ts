import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import LoginService from "@/features/login/api/LoginService";
import type { Session } from "@/features/login/api/models/Session";
import type { User } from "@/features/user/api/models/User";

type AuthStatus =
  | "logged_out"
  | "logging_in"
  | "logged_in"
  | "refreshing"
  | "expired";

type AuthError = "invalid_credentials" | "session_expired" | "generic" | null;

interface State {
  session: Session | null;
  user: User | null;
  status: AuthStatus;
  error: AuthError;
}

interface Action {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  isTokenExpired: () => boolean;
}

type AuthStore = State & Action;

const initialState: State = {
  session: null,
  user: null,
  status: "logged_out",
  error: null,
};

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: async (email, password) => {
        set({ status: "logging_in", error: null });
        try {
          const { user, session } = await LoginService().apiLogin(
            email,
            password,
          );
          set({ user, session, status: "logged_in" });
        } catch (err: unknown) {
          const message = (err as any)?.message;
          set({ status: "logged_out", error: message });
        }
      },

      logout: () => {
        set({ ...initialState });
      },

      refreshSession: async () => {
        const { session } = get();
        if (!session) return;

        set({ status: "refreshing", error: null });
        try {
          const newSession = await LoginService().apiRefresh(
            session.refreshToken,
          );
          set({ session: newSession, status: "logged_in" });
        } catch (_err: unknown) {
          // apiRefresh only throws 500 — treat as generic and expire the session
          set({
            session: null,
            user: null,
            status: "expired",
            error: "generic",
          });
        }
      },

      isTokenExpired: () => {
        const { session } = get();
        if (!session) {
          set({ status: "expired" });
          return true;
        }
        const expired = new Date(session.expiresAt) < new Date();
        if (expired) set({ status: "expired" });
        return expired;
      },
    }),
    {
      name: "auth-store",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        status: state.status,
      }),
    },
  ),
);

export { authStore as useAuthStore };
