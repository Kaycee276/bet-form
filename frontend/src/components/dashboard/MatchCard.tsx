import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  time,
  league,
  homeOdds,
  drawOdds,
  awayOdds,
}: MatchProps) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-panel rounded-3xl p-5 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-center mb-5">
        <span className="text-[11px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{league}</span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock size={14} className="text-primary" />
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 shadow-inner">
            <span className="text-sm font-heading font-bold text-white">{homeTeam.substring(0, 3).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-white text-center font-heading">{homeTeam}</span>
        </div>

        <div className="flex flex-col items-center px-4">
          <div className="w-8 h-8 rounded-full bg-bg-base flex items-center justify-center border border-white/5 text-xs font-bold text-slate-500 shadow-md">
            VS
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 shadow-inner">
            <span className="text-sm font-heading font-bold text-white">{awayTeam.substring(0, 3).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-white text-center font-heading">{awayTeam}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "1", odds: homeOdds },
          { label: "X", odds: drawOdds },
          { label: "2", odds: awayOdds },
        ].map((btn, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center justify-center gap-1 bg-slate-800/40 hover:bg-primary/20 hover:border-primary/50 border border-transparent rounded-xl py-2 transition-all cursor-pointer relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            <span className="text-[11px] font-bold text-slate-400 group-hover/btn:text-primary transition-colors">{btn.label}</span>
            <span className="text-sm font-heading font-bold text-white">{btn.odds}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
