import { X, LogIn } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { supabase } from "../lib/supabase";

export const SignupModal = () => {
  const { isOpen, closeModal } = useModalStore();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-card border border-primary/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-primary/10">
          <h2 className="text-xl font-bold text-primary">Join BetForm</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-300 text-center">
            Sign in to start predicting World Cup 2026 matches and climb the
            global leaderboard.
          </p>

          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <LogIn size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};
