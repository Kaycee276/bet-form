import { useAuthStore } from "../store/useAuthStore";
import { useStellarWallet } from "../context/StellarWalletContext";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Wallet, RefreshCw, CheckCircle2, ChevronRight, Bell, Shield, FileText, LogOut } from "lucide-react";

export const Settings = () => {
  const { user, signOut } = useAuthStore();
  const { isConnected, publicKey, network, usdcBalance, connectWallet, disconnectWallet, refreshBalance, isConnecting } = useStellarWallet();

  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Ambient spotlights */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-[#00e599]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-slate-800/15 rounded-full blur-[150px] pointer-events-none" />

      <header className="pt-10 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/logo.png" 
            alt="BetForm Logo" 
            className="w-5 h-5 rounded-md border border-white/10 object-cover" 
          />
          <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#00e599] font-medium">
            Manager Profile
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
          Settings & Wallet
        </h2>
        <p className="text-slate-400 font-normal text-xs md:text-sm">
          Manage your credentials, Freighter wallet, and USDC contest balance.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-5">
          {/* User Profile Double-Bezel Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="p-5 rounded-[calc(1rem-2px)] bg-[#0f121a] flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#141824] border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner font-mono font-bold text-white text-base">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user?.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "MP"
                  )}
                </div>
                {/* Online Indicator Dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00e599] border-2 border-[#08090d]" />
              </div>
              
              <div className="flex-1 overflow-hidden">
                <p className="text-base font-heading font-bold text-white truncate">
                  {user?.user_metadata?.full_name || "Tactical Manager"}
                </p>
                <p className="text-xs font-mono text-slate-400 truncate mt-0.5">{user?.email}</p>
                <span className="inline-block mt-2 text-[9px] font-mono font-semibold text-[#00e599] bg-[#00e599]/10 px-2 py-0.5 rounded-full border border-[#00e599]/25 uppercase tracking-wider">
                  Tactician Level 12
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stellar Web3 Wallet Double-Bezel Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="p-6 rounded-[calc(1rem-2px)] bg-[#0f121a] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="text-[#00e599]" size={18} />
                  <h3 className="font-heading font-bold text-white text-sm tracking-wide">
                    Stellar Freighter Wallet
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-white/[0.05] text-slate-300 rounded-full border border-white/[0.08]">
                  {network}
                </span>
              </div>

              {isConnected && publicKey ? (
                <div className="space-y-4 pt-1">
                  <div className="p-3 bg-[#131722] border border-white/[0.07] rounded-xl flex items-center justify-between font-mono text-xs text-slate-400">
                    <span className="truncate max-w-[240px] text-[#00e599] font-medium">{publicKey}</span>
                    <CheckCircle2 className="text-[#00e599] shrink-0 ml-2" size={15} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#131722] border border-white/[0.07] rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">USDC Contest Balance</p>
                      <p className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">{usdcBalance} <span className="text-xs text-[#00e599]">USDC</span></p>
                    </div>
                    <button
                      onClick={refreshBalance}
                      className="p-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 rounded-xl border border-white/10 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={15} />
                    </button>
                  </div>

                  <button
                    onClick={disconnectWallet}
                    className="w-full text-xs font-mono text-slate-400 hover:text-rose-400 py-1 transition-colors text-center cursor-pointer"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Connect your Stellar Freighter wallet to participate in USDC contest pools and receive automated on-chain payouts.
                  </p>
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full py-3 px-5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Wallet size={15} />
                    <span>{isConnecting ? "Connecting..." : "Connect Freighter Wallet"}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* App Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="p-2 rounded-[calc(1rem-2px)] bg-[#0f121a] space-y-1">
              <div className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-3 text-xs font-medium text-white">
                  <Bell size={16} className="text-slate-400" />
                  <span>Kickoff Notifications</span>
                </div>
                <div className="w-9 h-5 bg-[#00e599] rounded-full relative p-0.5 cursor-pointer">
                  <div className="w-4 h-4 bg-black rounded-full ml-auto shadow-sm" />
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors text-left cursor-pointer">
                <div className="flex items-center gap-3 text-xs font-medium text-white">
                  <Shield size={16} className="text-slate-400" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight size={15} className="text-slate-500" />
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors text-left cursor-pointer">
                <div className="flex items-center gap-3 text-xs font-medium text-white">
                  <FileText size={16} className="text-slate-400" />
                  <span>Terms of Service</span>
                </div>
                <ChevronRight size={15} className="text-slate-500" />
              </button>
            </div>
          </motion.div>

          {/* Sign Out Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/15 text-rose-400 text-xs font-mono font-semibold py-3 rounded-xl border border-rose-500/20 transition-all cursor-pointer shadow-sm"
          >
            <LogOut size={14} />
            <span>Sign Out Session</span>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
