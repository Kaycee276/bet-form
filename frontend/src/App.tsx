import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PromotionalLanding } from "./pages/PromotionalLanding";
import { SignupModal } from "./components/SignupModal";
import { Dashboard } from "./pages/Dashboard";
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
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session, session?.user ?? null);
      if (session) {
        navigate("/dashboard", { replace: true });
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
      </Routes>
      <SignupModal />
    </>
  );
}

export default App;
