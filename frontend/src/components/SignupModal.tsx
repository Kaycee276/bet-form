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
            className="absolute inset-0 discord-modal-backdrop"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="discord-panel w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white/15 bg-[#181b3d]"
          >
            {/* Ambient Blurple glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5865f2]/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5 font-heading font-black text-xl tracking-tight">
                <img 
                  src="/logo.png" 
                  alt="BetForm Logo" 
                  className="w-6 h-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(88,101,242,0.5)] object-cover" 
                />
                <div>
                  <span className="text-white">Join </span>
                  <span className="text-[#5865f2] drop-shadow-[0_0_10px_rgba(88,101,242,0.6)]">BetForm</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-full text-[#949ba4] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 space-y-6 relative z-10">
              <p className="text-[#949ba4] text-sm text-center leading-relaxed font-medium">
                Sign in to predict upcoming football fixtures, stake in USDC contest pools, and compete on the tactical leaderboard.
              </p>

              {walletError && (
                <div className="p-3 bg-[#ed4245]/20 border border-[#ed4245]/40 text-[#ed4245] rounded-xl text-xs font-mono">
                  {walletError}
                </div>
              )}

              <div className="space-y-3.5">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 py-3.5 px-6 rounded-full text-sm font-heading font-extrabold transition-all cursor-pointer shadow-lg"
                >
                  Continue with Google
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-[#949ba4] font-heading text-[11px] uppercase font-bold tracking-wider">Or Web3</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full discord-button-blurple py-3.5 px-6 rounded-full text-sm font-heading font-black flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Wallet size={17} />
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
