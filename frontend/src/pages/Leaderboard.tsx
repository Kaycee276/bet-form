import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Trophy, Lock, Sparkles } from "lucide-react";

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Ambient glass background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
          Global Leaderboard
        </h2>
        <p className="text-slate-400 font-medium text-xs md:text-sm">
          Compete for global tactical supremacy.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full h-[55vh] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden w-full border border-white/15 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-slate-900/90 border border-white/15 flex items-center justify-center shadow-2xl">
                <Trophy size={36} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full glass-panel border border-white/20 flex items-center justify-center shadow-lg">
                <Lock size={15} className="text-slate-400" />
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full text-xs font-bold text-amber-400">
                <Sparkles size={13} /> Seasonal Rankings
              </div>
              
              <h3 className="text-2xl font-heading font-black text-white tracking-tight">
                Global Ranking Engine
              </h3>
              
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
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
