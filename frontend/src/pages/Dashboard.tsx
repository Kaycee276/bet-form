import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MatchCard } from "../components/dashboard/MatchCard";
import { DashboardLoader } from "../components/dashboard/DashboardLoader";
import { BottomNav } from "../components/dashboard/BottomNav";
import { StatCards } from "../components/dashboard/StatCards";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Dashboard = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
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

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Brighter background ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Upcoming Fixtures
        </h2>
        <p className="text-slate-300 font-medium text-xs md:text-sm">
          Lock in your tactical predictions before kickoff lockdown.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <StatCards />

          {isLoading ? (
            <DashboardLoader />
          ) : (
            <div className="flex flex-col gap-10">
              {Object.entries(
                fixtures.reduce(
                  (acc, match) => {
                    if (!acc[match.league]) acc[match.league] = [];
                    acc[match.league].push(match);
                    return acc;
                  },
                  {} as Record<string, Fixture[]>,
                ),
              ).map(([league, matches]) => (
                <div key={league}>
                  <div className="sticky top-0 z-20 glass-nav backdrop-blur-2xl py-3 px-4 rounded-none mb-6 border border-white/20 flex items-center justify-between">
                    <h3 className="text-lg font-heading font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                      {league}
                    </h3>
                    <span className="text-xs font-black text-emerald-300 glass-pill px-3 py-1 rounded-none border border-emerald-400/30">
                      {matches.length} Matches
                    </span>
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
