import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (session: Session | null, user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  setAuth: (session, user) => set({ session, user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  signOut: async () => {
    const { supabase } = await import("../lib/supabase");
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
