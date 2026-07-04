import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PromotionalLanding } from "./pages/PromotionalLanding";
import { SignupModal } from "./components/SignupModal";
import { Dashboard } from "./pages/Dashboard";
import { Leaderboard } from "./pages/Leaderboard";
import { Settings } from "./pages/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session, session?.user ?? null);
      if (session && window.location.pathname === "/") {
        navigate("/dashboard", { replace: true });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setAuth(session, session?.user ?? null);
      if (session) {
        // Only redirect to dashboard if they just signed in or are on the public landing page
        if (event === "SIGNED_IN" || window.location.pathname === "/") {
          navigate("/dashboard", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PromotionalLanding />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <SignupModal />
    </>
  );
}

export default App;
