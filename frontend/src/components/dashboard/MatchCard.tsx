import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  status: string;
}

export const MatchCard = ({ homeTeam, awayTeam, time, status }: MatchProps) => {
  const isOpen = status === "OPEN";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="p-1 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] group cursor-pointer hover:border-white/[0.16] transition-all"
    >
      <div className="h-full p-5 rounded-[calc(1.5rem-4px)] bg-[#0f121a] flex flex-col justify-between">
        <div className="flex justify-between items-center mb-5">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isOpen
                ? "text-[#00e599] bg-[#00e599]/10 border-[#00e599]/25"
                : status === "LOCKED"
                  ? "text-slate-400 bg-white/[0.04] border-white/10"
                  : "text-slate-400 bg-white/[0.04] border-white/10"
            }`}
          >
            {isOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />}
            {status.replace("_", " ")}
          </span>
          
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
            <Clock size={11} className="text-[#00e599]" />
            <span>{time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between my-2">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2.5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-[#141824] flex items-center justify-center border border-white/[0.09] shadow-inner group-hover:border-[#00e599]/40 transition-colors">
              <span className="text-sm font-mono font-bold text-white tracking-wider">
                {homeTeam.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-heading font-medium text-slate-200 text-center leading-snug max-w-[105px] truncate">
              {homeTeam}
            </span>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center px-2">
            <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-[10px] font-mono font-semibold text-slate-400">
              VS
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2.5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-[#141824] flex items-center justify-center border border-white/[0.09] shadow-inner group-hover:border-[#00e599]/40 transition-colors">
              <span className="text-sm font-mono font-bold text-white tracking-wider">
                {awayTeam.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-heading font-medium text-slate-200 text-center leading-snug max-w-[105px] truncate">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Action footer */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
          <span>{isOpen ? "Draft Formation & XI" : "View Prediction"}</span>
          <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-[#00e599] group-hover:text-black transition-all">
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
