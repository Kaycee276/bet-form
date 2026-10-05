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
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
    <div className="min-h-screen bg-[#0a0d3a] flex flex-col relative pb-32 overflow-hidden text-white">
      {/* Discord ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#5865f2]/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#35ed7e]/12 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-10 pb-6 px-6 relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img 
              src="/logo.png" 
              alt="BetForm Logo" 
              className="w-6 h-6 rounded-lg border border-white/20 shadow-[0_0_10px_rgba(88,101,242,0.4)] object-cover" 
            />
            <span className="text-xs font-heading font-black tracking-wider uppercase text-[#35ed7e]">
              Tactical Headquarters
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white">
            Matchday Fixtures
          </h2>
          <p className="text-[#949ba4] font-medium text-xs md:text-sm mt-1">
            Pick formations and draft starting XIs before kickoff lockdown.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#181b3d] border border-white/10 self-start md:self-auto">
          {(["ALL", "OPEN", "SETTLED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#5865f2] text-white shadow-[0_0_15px_rgba(88,101,242,0.5)]"
                  : "text-[#949ba4] hover:text-white"
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
                  {/* Discord Channel / Category Header */}
                  <div className="sticky top-4 z-20 discord-nav backdrop-blur-2xl py-3 px-6 rounded-2xl mb-5 flex items-center justify-between shadow-xl">
                    <h3 className="text-base font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Hash size={18} className="text-[#5865f2]" />
                      <span>{league}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#35ed7e]" />
                      <span className="text-xs font-black text-[#35ed7e] bg-[#35ed7e]/15 px-3 py-0.5 rounded-full border border-[#35ed7e]/30">
                        {matches.length} Matches
                      </span>
                    </div>
                  </div>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
