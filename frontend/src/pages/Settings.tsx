import { useAuthStore } from "../store/useAuthStore";
import { useStellarWallet } from "../context/StellarWalletContext";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Wallet, RefreshCw, CheckCircle2, ChevronRight, Bell, Shield, FileText, LogOut } from "lucide-react";

export const Settings = () => {
  const { user, signOut } = useAuthStore();
  const { isConnected, publicKey, network, usdcBalance, connectWallet, disconnectWallet, refreshBalance, isConnecting } = useStellarWallet();

  return (
    <div className="min-h-screen bg-[#0a0d3a] flex flex-col relative pb-32 overflow-hidden text-white">
      {/* Ambient Discord glows */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#5865f2]/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#35ed7e]/12 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-10 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/logo.png" 
            alt="BetForm Logo" 
            className="w-6 h-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(88,101,242,0.4)] object-cover" 
          />
          <span className="text-xs font-heading font-black tracking-wider uppercase text-[#35ed7e]">
            Manager Profile
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Settings & Wallet
        </h2>
        <p className="text-[#949ba4] font-medium text-xs md:text-sm">
          Manage your credentials, Freighter wallet, and USDC contest balance.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-5">
          {/* User Profile Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="discord-card p-6 flex items-center gap-5 relative overflow-hidden"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[#23272a] border-2 border-[#5865f2] flex items-center justify-center overflow-hidden shrink-0 shadow-xl font-heading font-black text-[#5865f2] text-xl">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user?.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "MP"
                )}
              </div>
              {/* Online Green Indicator Dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#35ed7e] border-2 border-[#0a0d3a]" />
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-lg font-heading font-black text-white truncate">
                {user?.user_metadata?.full_name || "Tactical Manager"}
              </p>
              <p className="text-xs text-[#949ba4] font-medium truncate mt-0.5">{user?.email}</p>
              <span className="inline-block mt-2 text-[10px] font-black text-[#5865f2] bg-[#5865f2]/15 px-2.5 py-0.5 rounded-full border border-[#5865f2]/30 uppercase tracking-wider">
                Tactician Level 12
              </span>
            </div>
          </motion.div>

          {/* Stellar Web3 Wallet Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="discord-card p-6 space-y-4 relative overflow-hidden border border-[#5865f2]/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-[#5865f2]" size={20} />
                <h3 className="font-heading font-black text-white text-base tracking-wide">
                  Stellar Freighter Wallet
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#35ed7e]/15 text-[#35ed7e] rounded-full border border-[#35ed7e]/30">
                {network}
              </span>
            </div>

            {isConnected && publicKey ? (
              <div className="space-y-4 pt-1">
                <div className="p-3 bg-[#101338] border border-white/10 rounded-xl flex items-center justify-between font-mono text-xs text-[#949ba4]">
                  <span className="truncate max-w-[240px] text-[#35ed7e] font-bold">{publicKey}</span>
                  <CheckCircle2 className="text-[#35ed7e] shrink-0 ml-2" size={16} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#141740] border border-[#5865f2]/30 rounded-xl">
                  <div>
                    <p className="text-xs text-[#949ba4] font-heading font-bold uppercase">USDC Contest Balance</p>
                    <p className="text-2xl font-heading font-black text-white mt-1">{usdcBalance} <span className="text-xs text-[#35ed7e]">USDC</span></p>
                  </div>
                  <button
                    onClick={refreshBalance}
                    className="p-2.5 bg-[#5865f2]/20 hover:bg-[#5865f2]/30 text-[#5865f2] rounded-xl border border-[#5865f2]/40 transition-colors cursor-pointer"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>

                <button
                  onClick={disconnectWallet}
                  className="w-full text-xs font-heading font-bold text-[#949ba4] hover:text-[#ed4245] py-1 transition-colors text-center cursor-pointer"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-[#949ba4] leading-relaxed">
                  Connect your Stellar Freighter wallet to participate in USDC contest pools and receive automated on-chain payouts.
                </p>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full discord-button-blurple py-3.5 text-sm font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wallet size={16} />
                  <span>{isConnecting ? "Connecting..." : "Connect Freighter Wallet"}</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* App Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="discord-card p-2 space-y-1"
          >
            <div className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3 text-sm font-bold text-white">
                <Bell size={18} className="text-[#5865f2]" />
                <span>Kickoff Notifications</span>
              </div>
              <div className="w-10 h-5 bg-[#35ed7e] rounded-full relative p-0.5 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-md" />
              </div>
            </div>

            <button className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer">
              <div className="flex items-center gap-3 text-sm font-bold text-white">
                <Shield size={18} className="text-[#35ed7e]" />
                <span>Privacy & Security</span>
              </div>
              <ChevronRight size={16} className="text-[#949ba4]" />
            </button>

            <button className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer">
              <div className="flex items-center gap-3 text-sm font-bold text-white">
                <FileText size={18} className="text-[#00b0f4]" />
                <span>Terms of Service</span>
              </div>
              <ChevronRight size={16} className="text-[#949ba4]" />
            </button>
          </motion.div>

          {/* Sign Out Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-[#ed4245]/15 hover:bg-[#ed4245]/25 text-[#ed4245] text-sm font-heading font-black py-3.5 rounded-2xl border border-[#ed4245]/30 transition-all cursor-pointer shadow-lg"
          >
            <LogOut size={16} />
            <span>Sign Out Session</span>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
