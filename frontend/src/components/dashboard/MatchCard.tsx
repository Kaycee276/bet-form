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
      whileHover={{ y: -4 }}
      className="glass-panel rounded-3xl p-5 group cursor-pointer relative overflow-hidden"
    >
      {/* <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div> */}

      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          <span
            className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              status === "OPEN"
                ? "text-emerald-400 bg-emerald-400/10"
                : status === "LOCKED"
                  ? "text-rose-400 bg-rose-400/10"
                  : status === "SETTLED"
                    ? "text-slate-400 bg-slate-400/10"
                    : "text-amber-400 bg-amber-400/10"
            }`}
          >
            {status.replace("_", " ")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock size={14} className="text-primary" />
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center border border-white/5">
            <span className="text-sm font-heading font-bold text-white">
              {homeTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-white text-center font-heading">
            {homeTeam}
          </span>
        </div>

        <div className="flex flex-col items-center px-4">
          <div className="w-8 h-8 rounded-full bg-bg-base flex items-center justify-center border border-white/5 text-xs font-bold text-slate-500 shadow-md">
            VS
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center border border-white/5 shadow-inner">
            <span className="text-sm font-heading font-bold text-white">
              {awayTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-white text-center font-heading">
            {awayTeam}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
