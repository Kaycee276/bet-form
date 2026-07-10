import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MatchCard } from "../components/dashboard/MatchCard";
import { DashboardLoader } from "../components/dashboard/DashboardLoader";
import { BottomNav } from "../components/dashboard/BottomNav";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <div className="min-h-screen bg-bg-base flex flex-col relative pb-32">
      <header className="pt-12 pb-6 px-6 relative z-10 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-2">
          Upcoming Fixtures
        </h2>
        <p className="text-slate-400 font-medium text-xs">
          Lock in your predictions before kickoff.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
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
                  <h3 className="sticky top-0 z-20 bg-bg-base py-4 text-xl font-heading font-bold text-white mb-6 border-l-4 border-primary pl-3 uppercase tracking-wider">
                    {league}
                  </h3>
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
