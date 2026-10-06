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
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="p-1 rounded-[2rem] bg-white/[0.04] border border-white/10 w-full max-w-md shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] relative z-10"
          >
            <div className="p-7 md:p-8 rounded-[calc(2rem-4px)] bg-[#0e1118]">
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-10">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/logo.png" 
                    alt="BetForm Logo" 
                    className="w-6 h-6 rounded-md border border-white/10 object-cover" 
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-base">BetForm</span>
                    <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                      AUTH
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="pt-6 space-y-6 relative z-10">
                <p className="text-slate-400 text-xs text-center leading-relaxed font-normal">
                  Authenticate to predict fixtures, enter decentralized USDC contest pools, and claim rewards on Stellar Soroban.
                </p>

                {walletError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-mono">
                    {walletError}
                  </div>
                )}

                <div className="space-y-3">
                  <button 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-black py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    Continue with Google
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-white/[0.07]"></div>
                    <span className="flex-shrink mx-3 text-slate-500 font-mono text-[10px] uppercase tracking-widest">Or Web3</span>
                    <div className="flex-grow border-t border-white/[0.07]"></div>
                  </div>

                  <button 
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="w-full py-3 px-6 rounded-full bg-[#00e599] hover:bg-[#05f0a2] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-[0_8px_24px_-4px_rgba(0,229,153,0.35)] active:scale-[0.98]"
                  >
                    <Wallet size={15} />
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
