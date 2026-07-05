import { useEffect, useState } from "react";
import { MatchCard } from "../components/dashboard/MatchCard";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";

interface ApiFixture {
  id: string;
  homeTeamName: string;
  awayTeamName: string;
  kickoffAt: string;
  round: string;
}

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Dashboard = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/fixtures')
      .then(res => res.json())
      .then((data: ApiFixture[]) => {
        const formatted: Fixture[] = data.map((f) => ({
          id: f.id,
          homeTeam: f.homeTeamName,
          awayTeam: f.awayTeamName,
          time: new Date(f.kickoffAt).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          league: f.round,
          homeOdds: "2.10",
          drawOdds: "3.40",
          awayOdds: "3.80",
        }));
        setFixtures(formatted);
      })
      .catch(err => console.error("Failed to fetch fixtures:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col relative pb-32">

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-2">Upcoming Fixtures</h2>
        <p className="text-slate-400 font-medium text-xs">Lock in your predictions before kickoff.</p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-emerald-300 animate-spin opacity-50 animation-delay-200"></div>
              </div>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {fixtures.map((match) => (
                <motion.div key={match.id} variants={item}>
                  <MatchCard {...match} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
