import { useAuthStore } from "../store/useAuthStore";
import { useStellarWallet } from "../context/StellarWalletContext";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Wallet, RefreshCw, CheckCircle2 } from "lucide-react";

export const Settings = () => {
  const { user, signOut } = useAuthStore();
  const { isConnected, publicKey, network, usdcBalance, connectWallet, disconnectWallet, refreshBalance, isConnecting } = useStellarWallet();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Brighter ambient glass glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Settings & Wallet
        </h2>
        <p className="text-slate-300 font-medium text-xs md:text-sm">
          Manage your manager credentials, Web3 wallet, and USDC contest balance.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-none p-6 flex items-center gap-5 border border-white/20 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-none bg-slate-800 border border-emerald-400/40 flex items-center justify-center overflow-hidden shrink-0 shadow-lg font-heading font-black text-emerald-300 text-xl">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "MP"
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-lg font-heading font-black text-white truncate">
                {user?.user_metadata?.full_name || "Head Manager"}
              </p>
              <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{user?.email}</p>
            </div>
          </motion.div>

          {/* Stellar Web3 Wallet Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-none p-6 space-y-4 border border-emerald-400/30 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-emerald-400" size={20} />
                <h3 className="font-heading font-black text-white text-base uppercase tracking-wider">
                  Stellar Freighter Wallet
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {network}
              </span>
            </div>

            {isConnected && publicKey ? (
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-slate-950/60 border border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
                  <span className="truncate max-w-[240px] text-emerald-400 font-bold">{publicKey}</span>
                  <CheckCircle2 className="text-emerald-400 shrink-0 ml-2" size={16} />
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-950/30 border border-emerald-500/30">
                  <div>
                    <p className="text-xs text-slate-300 font-heading font-bold uppercase">USDC Contest Balance</p>
                    <p className="text-2xl font-heading font-black text-emerald-300">{usdcBalance} USDC</p>
                  </div>
                  <button
                    onClick={refreshBalance}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 transition-colors"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>

                <button
                  onClick={disconnectWallet}
                  className="w-full text-xs font-heading font-bold text-slate-400 hover:text-rose-400 py-2 transition-colors text-center"
                >
                  Disconnect Freighter Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-300">
                  Connect your Stellar Freighter wallet to participate in USDC contest pools and claim on-chain rewards.
                </p>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-black py-3 text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                >
                  {isConnecting ? "Connecting to Freighter..." : "Connect Freighter Wallet"}
                </button>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-none p-3 space-y-1 border border-white/20 shadow-xl"
          >
            <div className="w-full flex items-center justify-between p-4 rounded-none">
              <span className="font-heading text-sm font-bold text-slate-200">Push Notifications</span>
              <div className="w-11 h-6 bg-emerald-400 rounded-none relative shadow-inner p-1">
                <div className="w-4 h-4 bg-slate-900 rounded-none shadow-md ml-auto"></div>
              </div>
            </div>

            <button className="w-full flex items-center justify-between p-4 rounded-none hover:bg-white/10 transition-colors text-left">
              <span className="font-heading text-sm font-bold text-slate-200">Privacy Policy</span>
              <span className="text-xs text-slate-400 font-black">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-none hover:bg-white/10 transition-colors text-left">
              <span className="font-heading text-sm font-bold text-slate-200">Terms of Service</span>
              <span className="text-xs text-slate-400 font-black">→</span>
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-sm font-heading font-black py-4 rounded-none border border-rose-400/40 transition-all cursor-pointer shadow-lg"
          >
            <span>Sign Out Session</span>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

