import { BottomNav } from "../components/dashboard/BottomNav";
import { motion, type Variants } from "framer-motion";
import { Crown, Sparkles, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  favoriteFormation: string;
  points: number;
  accuracy: string;
  isCurrentUser?: boolean;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "TacticalPep",
    avatar: "TP",
    favoriteFormation: "3-3-3-1",
    points: 1248.5,
    accuracy: "84.2%",
  },
  {
    rank: 2,
    name: "Klopp Gegenpress",
    avatar: "KG",
    favoriteFormation: "4-3-3",
    points: 1192.0,
    accuracy: "81.0%",
  },
  {
    rank: 3,
    name: "SpecialOne_01",
    avatar: "SO",
    favoriteFormation: "5-3-2",
    points: 1140.5,
    accuracy: "79.5%",
  },
  {
    rank: 4,
    name: "ZizouVolley",
    avatar: "ZV",
    favoriteFormation: "4-2-3-1",
    points: 980.0,
    accuracy: "75.1%",
  },
  {
    rank: 5,
    name: "AncelottiEyebrow",
    avatar: "AE",
    favoriteFormation: "4-4-2",
    points: 924.0,
    accuracy: "73.8%",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.35, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#00e599]/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-slate-800/15 rounded-full blur-[150px] pointer-events-none" />

      <header className="pt-10 pb-6 px-6 relative z-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/logo.png" 
            alt="BetForm Logo" 
            className="w-5 h-5 rounded-md border border-white/10 object-cover" 
          />
          <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#00e599] font-medium">
            Global Rankings
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
          Tactical Leaderboard
        </h2>
        <p className="text-slate-400 font-normal text-xs md:text-sm">
          Compete for global supremacy, season badges, and decentralized USDC contest prizes.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10 max-w-2xl mx-auto w-full space-y-6">
        {/* Top 3 Podium Cards - Refined Matte Metallurgy */}
        <div className="grid grid-cols-3 gap-3 pt-2 items-end">
          {/* Rank 2 (Silver) */}
          <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="p-4 text-center rounded-[calc(1rem-2px)] bg-[#0f121a] flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">#2</span>
              <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-400/40 flex items-center justify-center font-mono font-bold text-xs text-slate-200 mb-2 shadow-inner">
                {mockLeaderboard[1].avatar}
              </div>
              <p className="font-heading font-semibold text-xs text-white truncate max-w-full">{mockLeaderboard[1].name}</p>
              <p className="text-xs font-mono font-bold text-slate-300 mt-1 tabular-nums">{mockLeaderboard[1].points} <span className="text-[9px] text-slate-500">PTS</span></p>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="p-1 rounded-2xl bg-amber-400/10 border border-amber-400/30 -translate-y-2 shadow-[0_12px_32px_-8px_rgba(245,158,11,0.2)]">
            <div className="p-4 md:p-5 text-center rounded-[calc(1rem-2px)] bg-[#121520] flex flex-col items-center">
              <Crown size={20} className="text-amber-400 mb-1" />
              <div className="w-13 h-13 rounded-2xl bg-amber-400/10 border border-amber-400/50 flex items-center justify-center font-mono font-bold text-sm text-amber-400 mb-2 shadow-inner">
                {mockLeaderboard[0].avatar}
              </div>
              <p className="font-heading font-bold text-xs md:text-sm text-white truncate max-w-full">{mockLeaderboard[0].name}</p>
              <p className="text-sm font-mono font-bold text-[#00e599] mt-1 tabular-nums">{mockLeaderboard[0].points} <span className="text-[9px] text-slate-500">PTS</span></p>
              <span className="text-[9px] font-mono font-semibold text-amber-400 uppercase tracking-widest mt-1">Champion</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="p-4 text-center rounded-[calc(1rem-2px)] bg-[#0f121a] flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-amber-700 mb-1">#3</span>
              <div className="w-11 h-11 rounded-2xl bg-amber-950/40 border border-amber-700/40 flex items-center justify-center font-mono font-bold text-xs text-amber-600 mb-2 shadow-inner">
                {mockLeaderboard[2].avatar}
              </div>
              <p className="font-heading font-semibold text-xs text-white truncate max-w-full">{mockLeaderboard[2].name}</p>
              <p className="text-xs font-mono font-bold text-slate-300 mt-1 tabular-nums">{mockLeaderboard[2].points} <span className="text-[9px] text-slate-500">PTS</span></p>
            </div>
          </div>
        </div>

        {/* Manager Leaderboard Double-Bezel Table */}
        <div className="p-1 rounded-[1.75rem] bg-white/[0.03] border border-white/[0.08]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="p-5 rounded-[calc(1.75rem-4px)] bg-[#0f121a] space-y-2.5"
          >
            <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-white/[0.06] pb-2">
              <span>Rank & Manager</span>
              <span>Accuracy / Total Pts</span>
            </div>

            {mockLeaderboard.map((entry) => (
              <motion.div
                key={entry.rank}
                variants={item}
                className="flex items-center justify-between p-3 rounded-xl bg-[#131722] hover:bg-[#181d2a] border border-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center text-xs font-mono font-bold ${entry.rank <= 3 ? "text-white" : "text-slate-500"}`}>
                    #{entry.rank}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#181c28] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0">
                    {entry.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-xs md:text-sm text-white">{entry.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                      {entry.favoriteFormation}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-xs md:text-sm text-white tabular-nums">{entry.points} <span className="text-[10px] font-normal text-slate-400">PTS</span></p>
                  <p className="text-[10px] text-[#00e599] font-mono font-medium flex items-center justify-end gap-1">
                    <TrendingUp size={10} />
                    <span>{entry.accuracy}</span>
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Current User Row */}
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#00e599]/10 border border-[#00e599]/30 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-mono font-bold text-[#00e599]">#1,024</span>
                  <div className="w-9 h-9 rounded-xl bg-[#00e599] flex items-center justify-center font-mono font-bold text-xs text-black">
                    YOU
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs md:text-sm text-white">Your Manager Rank</h4>
                    <span className="text-[10px] text-[#00e599] font-mono font-semibold uppercase">Season Active</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-xs md:text-sm text-white tabular-nums">342.5 <span className="text-[10px] font-normal text-slate-400">PTS</span></p>
                  <p className="text-[10px] text-slate-400 font-mono">68.4% Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seasonal Badge Notice */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-center flex items-center justify-center gap-2.5">
          <Sparkles size={15} className="text-[#00e599]" />
          <span className="text-xs font-mono text-slate-400">
            Season 1 settlements conclude in 14 days. Top 100 share USDC prize pools.
          </span>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
