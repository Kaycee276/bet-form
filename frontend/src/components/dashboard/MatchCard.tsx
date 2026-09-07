import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  status: string;
}

export const MatchCard = ({ homeTeam, awayTeam, time, status }: MatchProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card rounded-3xl p-6 group cursor-pointer relative overflow-hidden"
    >
      {/* Ambient background card glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex gap-2">
          <span
            className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
              status === "OPEN"
                ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : status === "LOCKED"
                  ? "text-rose-400 bg-rose-500/15 border-rose-500/30"
                  : status === "SETTLED"
                    ? "text-slate-400 bg-slate-500/15 border-slate-500/30"
                    : "text-amber-400 bg-amber-500/15 border-amber-500/30"
            }`}
          >
            {status.replace("_", " ")}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium glass-pill px-2.5 py-1 rounded-full border border-white/10">
          <Clock size={13} className="text-emerald-400" />
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between my-2 relative z-10">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 flex items-center justify-center border border-white/15 shadow-xl group-hover:border-emerald-500/40 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {homeTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-slate-100 text-center leading-snug">
            {homeTeam}
          </span>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center px-4">
          <div className="w-9 h-9 rounded-full bg-slate-900/90 backdrop-blur-md flex items-center justify-center border border-white/15 text-xs font-black text-emerald-400 shadow-lg">
            VS
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 flex items-center justify-center border border-white/15 shadow-xl group-hover:border-emerald-500/40 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {awayTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-slate-100 text-center leading-snug">
            {awayTeam}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
