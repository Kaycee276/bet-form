import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pitch } from "../components/predict/Pitch";
import { PlayerRoster } from "../components/predict/PlayerRoster";
import { CustomDropdown } from "../components/ui/CustomDropdown";
import { usePredictionStore } from "../store/usePredictionStore";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface PlayerData {
  id: number;
  name: string;
  position: string;
  photo?: string | null;
}

interface SquadData {
  id: string;
  teamSide: "HOME" | "AWAY";
  shirtNumber?: number;
  player: PlayerData;
}

interface FixtureDetail {
  id: string;
  homeTeamName: string;
  homeTeamBadge?: string;
  awayTeamName: string;
  awayTeamBadge?: string;
  time: string;
  squads: SquadData[];
}

const formations = ["4-3-3", "4-2-3-1", "4-4-2", "3-5-2", "3-4-3", "5-3-2", "4-1-4-1", "3-4-2-1"];

export const PredictFixture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fixture, setFixture] = useState<FixtureDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { selectedTeam, setSelectedTeam, homeFormation, awayFormation, setFormation, reset } = usePredictionStore();
  const formation = selectedTeam === "HOME" ? homeFormation : awayFormation;

  useEffect(() => {
    reset();
    
    fetch(`${API_URL}/api/fixtures/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFixture(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
      
    return () => reset();
  }, [id, reset]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-teal-300 animate-spin opacity-60"></div>
        </div>
      </div>
    );
  }

  if (!fixture) {
    return <div className="min-h-screen bg-[#07090e] text-white p-12">Fixture not found.</div>;
  }

  const currentSquad = fixture.squads
    ?.filter((s) => s.teamSide === selectedTeam)
    .map((s) => s.player) || [];

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col pb-16 text-slate-100 overflow-hidden relative">
      {/* Ambient glass background glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-8 pb-6 px-6 max-w-7xl mx-auto w-full border-b border-white/10 mb-6 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-xs font-bold uppercase tracking-wider glass-pill px-4 py-1.5 rounded-full border border-white/10 w-fit"
        >
          <ArrowLeft size={14} /> Back to Fixtures
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
              Tactical Lineup Studio
            </h2>
            <p className="text-slate-400 text-xs md:text-sm">
              Predict starting XI and formation for <span className="font-bold text-emerald-400">{selectedTeam === "HOME" ? fixture.homeTeamName : fixture.awayTeamName}</span>
            </p>
          </div>
          
          <button disabled className="glass-button-secondary text-slate-400 font-bold px-6 py-2.5 rounded-full cursor-not-allowed whitespace-nowrap w-full md:w-auto text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10">
            <ShieldCheck size={16} /> Lock Prediction
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Glass Controls Panel */}
          <div className="glass-panel p-4 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-white/15 shadow-2xl">
            {/* Team Toggle */}
            <div className="flex bg-slate-950/60 p-1.5 rounded-full w-full sm:w-auto border border-white/10">
              <button 
                onClick={() => setSelectedTeam("HOME")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-heading font-extrabold transition-all ${
                  selectedTeam === "HOME" 
                    ? 'glass-button-primary text-slate-950 shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fixture.homeTeamName}
              </button>
              <button 
                onClick={() => setSelectedTeam("AWAY")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-heading font-extrabold transition-all ${
                  selectedTeam === "AWAY" 
                    ? 'glass-button-primary text-slate-950 shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fixture.awayTeamName}
              </button>
            </div>

            {/* Formation Selector */}
            <CustomDropdown
              label="Formation"
              value={formation}
              options={formations}
              onChange={setFormation}
            />
          </div>

          {/* Tactical Pitch */}
          <Pitch squad={currentSquad} />
        </div>

        <div className="lg:col-span-4 h-[620px] lg:h-auto">
          <PlayerRoster squad={currentSquad} />
        </div>
      </main>
    </div>
  );
};
