import { useEffect, useState } from "react";
import { MatchCard } from "../components/dashboard/MatchCard";
import { BottomNav } from "../components/dashboard/BottomNav";

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
          // Format kickoff as e.g., "Thu, 19:30"
          time: new Date(f.kickoffAt).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          league: f.round,
          // Placeholder odds
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
    <div className="min-h-screen bg-bg-dark flex flex-col pb-16">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Fixtures</h2>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mb-8">
              {fixtures.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
