interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  league: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  time,
  league,
  homeOdds,
  drawOdds,
  awayOdds,
}: MatchProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">{league}</span>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">{time}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform border border-white/5">
            <span className="text-sm font-bold text-white">{homeTeam.substring(0, 3).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-white text-center">{homeTeam}</span>
        </div>

        <div className="flex flex-col items-center px-4">
          <span className="text-sm font-bold text-gray-500">VS</span>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform border border-white/5">
            <span className="text-sm font-bold text-white">{awayTeam.substring(0, 3).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-white text-center">{awayTeam}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button className="bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 border border-transparent text-white rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer">
          1 • {homeOdds}
        </button>
        <button className="bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 border border-transparent text-white rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer">
          X • {drawOdds}
        </button>
        <button className="bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/50 border border-transparent text-white rounded-lg py-2 text-sm font-medium transition-colors cursor-pointer">
          2 • {awayOdds}
        </button>
      </div>
    </div>
  );
};
