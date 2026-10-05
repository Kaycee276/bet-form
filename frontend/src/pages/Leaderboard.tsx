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
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#0a0d3a] flex flex-col relative pb-32 overflow-hidden text-white">
      {/* Discord ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5865f2]/18 rounded-full blur-[170px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#ec48bd]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-10 pb-6 px-6 relative z-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src="/logo.png" 
            alt="BetForm Logo" 
            className="w-6 h-6 rounded-lg border border-white/20 shadow-[0_0_8px_rgba(88,101,242,0.4)] object-cover" 
          />
          <span className="text-xs font-heading font-black tracking-wider uppercase text-[#35ed7e]">
            Global Rankings
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Tactical Leaderboard
        </h2>
        <p className="text-[#949ba4] font-medium text-xs md:text-sm">
          Compete for global supremacy, season badges, and USDC contest prizes.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10 max-w-2xl mx-auto w-full space-y-6">
        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-3 gap-3 pt-2 items-end">
          {/* Rank 2 */}
          <div className="discord-card p-4 text-center rounded-2xl border border-white/15 bg-[#14173e] flex flex-col items-center">
            <span className="text-xs font-black text-slate-300 mb-1">#2</span>
            <div className="w-12 h-12 rounded-full bg-slate-700/80 border-2 border-slate-300 flex items-center justify-center font-heading font-black text-sm text-white mb-2 shadow-lg">
              {mockLeaderboard[1].avatar}
            </div>
            <p className="font-heading font-bold text-xs text-white truncate max-w-full">{mockLeaderboard[1].name}</p>
            <p className="text-xs font-black text-[#5865f2] mt-1">{mockLeaderboard[1].points} pts</p>
          </div>

          {/* Rank 1 */}
          <div className="discord-card p-5 text-center rounded-2xl border-2 border-[#f59e0b] bg-[#1e2353] flex flex-col items-center shadow-[0_0_30px_rgba(245,158,11,0.3)] -translate-y-2">
            <Crown size={22} className="text-[#f59e0b] mb-1 animate-bounce" />
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-[#f59e0b] flex items-center justify-center font-heading font-black text-base text-[#f59e0b] mb-2 shadow-xl">
              {mockLeaderboard[0].avatar}
            </div>
            <p className="font-heading font-black text-sm text-white truncate max-w-full">{mockLeaderboard[0].name}</p>
            <p className="text-sm font-black text-[#35ed7e] mt-1">{mockLeaderboard[0].points} pts</p>
            <span className="text-[10px] font-extrabold text-[#f59e0b] uppercase tracking-wider mt-1">Champion</span>
          </div>

          {/* Rank 3 */}
          <div className="discord-card p-4 text-center rounded-2xl border border-white/15 bg-[#14173e] flex flex-col items-center">
            <span className="text-xs font-black text-amber-600 mb-1">#3</span>
            <div className="w-12 h-12 rounded-full bg-amber-900/40 border-2 border-amber-600 flex items-center justify-center font-heading font-black text-sm text-amber-500 mb-2 shadow-lg">
              {mockLeaderboard[2].avatar}
            </div>
            <p className="font-heading font-bold text-xs text-white truncate max-w-full">{mockLeaderboard[2].name}</p>
            <p className="text-xs font-black text-[#ec48bd] mt-1">{mockLeaderboard[2].points} pts</p>
          </div>
        </div>

        {/* Manager Leaderboard Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="discord-card p-4 space-y-2.5"
        >
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#949ba4] border-b border-white/10 pb-2">
            <span>Rank & Manager</span>
            <span>Accuracy / Total Pts</span>
          </div>

          {mockLeaderboard.map((entry) => (
            <motion.div
              key={entry.rank}
              variants={item}
              className="flex items-center justify-between p-3 rounded-xl bg-[#12153b] hover:bg-[#181b3d] border border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 text-center text-xs font-black ${entry.rank <= 3 ? "text-white" : "text-[#949ba4]"}`}>
                  #{entry.rank}
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#23272a] border border-white/15 flex items-center justify-center font-heading font-black text-xs text-white shrink-0">
                  {entry.avatar}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">{entry.name}</h4>
                  <span className="text-[10px] text-[#5865f2] font-black tracking-wider uppercase">
                    {entry.favoriteFormation}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-heading font-black text-sm text-white">{entry.points} pts</p>
                <p className="text-[10px] text-[#35ed7e] font-bold flex items-center justify-end gap-1">
                  <TrendingUp size={10} />
                  <span>{entry.accuracy}</span>
                </p>
              </div>
            </motion.div>
          ))}

          {/* Current User Row */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#5865f2]/20 border border-[#5865f2]/50 shadow-[0_0_20px_rgba(88,101,242,0.3)]">
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs font-black text-[#5865f2]">#1,024</span>
                <div className="w-9 h-9 rounded-xl bg-[#5865f2] flex items-center justify-center font-heading font-black text-xs text-white">
                  YOU
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-white">Your Manager Rank</h4>
                  <span className="text-[10px] text-[#35ed7e] font-black uppercase">Season Active</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-heading font-black text-sm text-white">342.5 pts</p>
                <p className="text-[10px] text-[#949ba4] font-bold">68.4% Accuracy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Seasonal Badge Notice */}
        <div className="discord-panel p-5 text-center flex items-center justify-center gap-3">
          <Sparkles size={18} className="text-[#35ed7e]" />
          <span className="text-xs font-bold text-[#949ba4]">
            Season 1 settlements conclude in 14 days. Top 100 share USDC contest rewards.
          </span>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
