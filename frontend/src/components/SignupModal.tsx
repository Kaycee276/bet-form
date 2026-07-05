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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-bg-card border border-white/10 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden relative z-10"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10">
              <h2 className="text-xl font-heading font-black text-white tracking-tight">Join BetForm</h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-8 relative z-10">
              <p className="text-slate-400 text-sm text-center leading-relaxed">
                Sign in to start predicting football matches and climb the
                global leaderboard.
              </p>

              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-3.5 rounded-2xl text-sm font-heading font-bold hover:bg-slate-200 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <LogIn size={18} />
                Continue with Google
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
