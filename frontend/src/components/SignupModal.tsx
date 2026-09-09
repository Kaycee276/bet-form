import { X, Wallet } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { useStellarWallet } from "../context/StellarWalletContext";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export const SignupModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { isConnected, publicKey, connectWallet, isConnecting, error: walletError } = useStellarWallet();

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

  const handleConnectWallet = async () => {
    const key = await connectWallet();
    if (key) {
      closeModal();
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
            className="glass-panel glass-panel-glow w-full max-w-md rounded-none shadow-2xl overflow-hidden relative z-10 border border-white/20"
          >
            {/* Ambient emerald orb glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/25 blur-3xl rounded-none translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="flex items-center justify-between p-6 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-2.5 font-heading font-black text-xl tracking-tight">
                <img src="/logo.png" alt="BetForm Logo" className="w-6 h-6 rounded-none border border-emerald-400/40 shadow-[0_0_8px_rgba(52,211,153,0.5)] object-cover" />
                <div>
                  <span className="text-white">Join </span>
                  <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]">BetForm</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-none text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-6 relative z-10">
              <p className="text-slate-200 text-sm text-center leading-relaxed font-medium">
                Sign in to predict upcoming football fixtures, enter USDC contest pools, and climb the tactical leaderboard.
              </p>

              {walletError && (
                <div className="p-3 bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-mono">
                  {walletError}
                </div>
              )}

              <div className="space-y-3">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 py-3.5 px-6 rounded-none text-sm font-heading font-black transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white"
                >
                  Continue with Google
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-slate-400 font-heading text-xs uppercase font-bold">Or Web3</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-3.5 px-6 rounded-none text-sm font-heading font-black transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                >
                  <Wallet size={18} />
                  <span>
                    {isConnecting
                      ? "Connecting..."
                      : isConnected && publicKey
                      ? `Connected: ${publicKey.substring(0, 6)}...${publicKey.substring(publicKey.length - 4)}`
                      : "Connect Stellar Freighter"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

