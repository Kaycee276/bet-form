import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Brighter ambient glass background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[160px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <img src="/logo.png" alt="BetForm Logo" className="w-6 h-6 rounded-none border border-emerald-400/40 shadow-[0_0_8px_rgba(52,211,153,0.5)] object-cover" />
          <span className="text-xs font-heading font-black tracking-wider uppercase text-emerald-400">BetForm Leaderboard</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Global Leaderboard
        </h2>
        <p className="text-slate-300 font-medium text-xs md:text-sm">
          Compete for global tactical supremacy.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full h-[55vh] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 rounded-none flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden w-full border border-white/20 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/25 blur-3xl rounded-none translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="space-y-3 relative z-10">
              <span className="inline-block glass-pill px-4 py-1.5 rounded-none text-xs font-black text-amber-300 uppercase tracking-wider border border-amber-400/40">
                Seasonal Rankings
              </span>
              
              <h3 className="text-3xl font-heading font-black text-white tracking-tight">
                Leaderboard Engine
              </h3>
              
              <p className="text-slate-200 text-sm leading-relaxed max-w-sm font-medium">
                The global leaderboard calculation engine is currently being forged. Check back after kickoff settlements to view your position.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
