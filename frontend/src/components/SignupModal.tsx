import { X, LogIn } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 glass-modal-backdrop"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-panel glass-panel-glow w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/15"
          >
            {/* Ambient emerald orb glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2 font-heading font-black text-xl tracking-tight">
                <span className="text-white">Join</span>
                <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">BetForm</span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-8 relative z-10">
              <p className="text-slate-300 text-sm text-center leading-relaxed font-medium">
                Sign in to predict upcoming football fixtures, build starting XIs, and climb the global tactical leaderboard.
              </p>

              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 py-3.5 px-6 rounded-2xl text-sm font-heading font-extrabold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white"
              >
                <LogIn size={18} className="text-slate-950" />
                Continue with Google
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
