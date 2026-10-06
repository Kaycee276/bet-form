import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MatchCard } from "../components/dashboard/MatchCard";
import { DashboardLoader } from "../components/dashboard/DashboardLoader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { StatCards } from "../components/dashboard/StatCards";
import { motion, type Variants } from "framer-motion";
import { Hash, Sparkles } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface ApiFixture {
  id: string;
  homeTeamName: string;
  awayTeamName: string;
  kickoffAt: string;
  league: string;
  status: string;
}

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  status: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
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

export const Dashboard = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "SETTLED">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/fixtures`)
      .then((res) => res.json())
      .then((data: ApiFixture[]) => {
        const formatted: Fixture[] = data.map((f) => ({
          id: f.id,
          homeTeam: f.homeTeamName,
          awayTeam: f.awayTeamName,
          time: new Date(f.kickoffAt).toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          league: f.league,
          status: f.status,
        }));
        setFixtures(formatted);
      })
      .catch((err) => console.error("Failed to fetch fixtures:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredFixtures = fixtures.filter((f) => {
    if (filter === "OPEN") return f.status === "OPEN";
    if (filter === "SETTLED") return f.status === "SETTLED";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[450px] bg-[#00e599]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-slate-800/15 rounded-full blur-[160px] pointer-events-none" />

      <header className="pt-8 pb-6 px-6 relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img 
              src="/logo.png" 
              alt="BetForm Logo" 
              className="w-5 h-5 rounded-md border border-white/10 object-cover" 
            />
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#00e599] font-medium">
              Tactical Headquarters
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white">
            Matchday Fixtures
          </h2>
          <p className="text-slate-400 font-normal text-xs md:text-sm mt-1">
            Pick tactical formations and draft starting XIs before kickoff lockdown.
          </p>
        </div>

        {/* Refined Filter Toggle Dock */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#10131c] border border-white/[0.08] self-start md:self-auto shadow-inner">
          {(["ALL", "OPEN", "SETTLED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                filter === tab
                  ? "bg-white text-[#08090d] shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "ALL" ? "All Matches" : tab === "OPEN" ? "Open Now" : "Settled"}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <StatCards />

          {isLoading ? (
            <DashboardLoader />
          ) : (
            <div className="flex flex-col gap-10">
              {Object.entries(
                filteredFixtures.reduce(
                  (acc, match) => {
                    if (!acc[match.league]) acc[match.league] = [];
                    acc[match.league].push(match);
                    return acc;
                  },
                  {} as Record<string, Fixture[]>,
                ),
              ).map(([league, matches]) => (
                <div key={league}>
                  {/* Category Header */}
                  <div className="sticky top-4 z-20 bg-[#0d1017]/85 backdrop-blur-xl border border-white/[0.08] py-2.5 px-5 rounded-2xl mb-4 flex items-center justify-between shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Hash size={16} className="text-[#00e599]" />
                      <span>{league}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <Sparkles size={13} className="text-[#00e599]" />
                      <span className="text-xs font-mono font-medium text-slate-300 bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                        {matches.length} Matches
                      </span>
                    </div>
                  </div>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {matches.map((match) => (
                      <motion.div key={match.id} variants={item}>
                        <Link to={`/predict/${match.id}`} className="block">
                          <MatchCard {...match} />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
