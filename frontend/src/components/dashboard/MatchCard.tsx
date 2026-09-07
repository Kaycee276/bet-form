import { motion } from "framer-motion";

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
      className="glass-card rounded-none p-6 group cursor-pointer relative overflow-hidden border border-white/20"
    >
      {/* Ambient background card glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-400/15 blur-2xl pointer-events-none group-hover:bg-emerald-400/25 transition-colors"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <span
          className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-none border ${
            status === "OPEN"
              ? "text-emerald-300 bg-emerald-400/20 border-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              : status === "LOCKED"
                ? "text-rose-300 bg-rose-400/20 border-rose-400/40"
                : status === "SETTLED"
                  ? "text-slate-300 bg-slate-400/20 border-slate-400/40"
                  : "text-amber-300 bg-amber-400/20 border-amber-400/40"
          }`}
        >
          {status.replace("_", " ")}
        </span>
        
        <div className="text-xs text-slate-200 font-extrabold glass-pill px-3 py-1 rounded-none border border-white/20">
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between my-2 relative z-10">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-none bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center border border-white/25 shadow-xl group-hover:border-emerald-400/60 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {homeTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-white text-center leading-snug">
            {homeTeam}
          </span>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center px-4">
          <div className="w-9 h-9 rounded-none bg-slate-800/90 backdrop-blur-md flex items-center justify-center border border-white/25 text-xs font-black text-emerald-400 shadow-lg">
            VS
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-none bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center border border-white/25 shadow-xl group-hover:border-emerald-400/60 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {awayTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-white text-center leading-snug">
            {awayTeam}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
