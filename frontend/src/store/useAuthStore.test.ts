import { describe, it, expect } from "vitest";
import { useAuthStore } from "./useAuthStore";
import type { User, Session } from "@supabase/supabase-js";

describe("useAuthStore", () => {
  it("should initialize with null session and user", () => {
    const state = useAuthStore.getState();
    expect(state.session).toBeNull();
    expect(state.user).toBeNull();
  });

  it("should set authentication state", () => {
    const mockUser = { id: "usr-1", email: "manager@betform.app" } as unknown as User;
    const mockSession = { access_token: "token123" } as unknown as Session;

    useAuthStore.getState().setAuth(mockSession, mockUser);

    const state = useAuthStore.getState();
    expect(state.user?.id).toBe("usr-1");
    expect(state.session?.access_token).toBe("token123");
  });
});
