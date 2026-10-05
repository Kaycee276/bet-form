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
      whileHover={{ y: -4 }}
      className="discord-card p-6 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle ambient Blurple glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#5865f2]/15 blur-2xl pointer-events-none group-hover:bg-[#5865f2]/25 transition-colors"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
            isOpen
              ? "text-[#35ed7e] bg-[#35ed7e]/15 border-[#35ed7e]/35 shadow-[0_0_12px_rgba(53,237,126,0.25)]"
              : status === "LOCKED"
                ? "text-[#ec48bd] bg-[#ec48bd]/15 border-[#ec48bd]/35"
                : "text-[#949ba4] bg-white/10 border-white/10"
          }`}
        >
          {isOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#35ed7e] animate-pulse" />}
          {status.replace("_", " ")}
        </span>
        
        <div className="inline-flex items-center gap-1.5 text-xs text-[#949ba4] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <Clock size={12} className="text-[#5865f2]" />
          {time}
        </div>
      </div>

      <div className="flex items-center justify-between my-3 relative z-10">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-[#181b3d] flex items-center justify-center border border-white/15 shadow-lg group-hover:border-[#5865f2]/60 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {homeTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-white text-center leading-snug max-w-[110px] truncate">
            {homeTeam}
          </span>
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center px-3">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_15px_rgba(88,101,242,0.5)]">
            VS
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-[#181b3d] flex items-center justify-center border border-white/15 shadow-lg group-hover:border-[#5865f2]/60 transition-colors">
            <span className="text-base font-heading font-black text-white tracking-wider">
              {awayTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-heading font-bold text-white text-center leading-snug max-w-[110px] truncate">
            {awayTeam}
          </span>
        </div>
      </div>

      {/* Action pill footer */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#949ba4] group-hover:text-white transition-colors">
        <span>{isOpen ? "Select Formation & XI" : "View Prediction"}</span>
        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#5865f2] group-hover:text-white transition-colors">
          <ArrowRight size={13} />
        </div>
      </div>
    </motion.div>
  );
};
