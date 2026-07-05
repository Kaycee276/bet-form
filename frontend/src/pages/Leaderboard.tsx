import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";
import { Trophy, Lock } from "lucide-react";

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col relative pb-32">

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-2">Leaderboard</h2>
        <p className="text-slate-400 font-medium text-xs">Compete for tactical supremacy.</p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full h-[50vh] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-[3rem] flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden w-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 shadow-inner mb-2">
                <Trophy size={32} className="text-yellow-500 opacity-50" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-bg-card border border-white/10 flex items-center justify-center shadow-lg">
                <Lock size={14} className="text-slate-400" />
              </div>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-heading font-black text-white tracking-tight">Coming Soon</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                The global leaderboard is currently being forged. Check back later to see where you rank among the world's best tacticians.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
