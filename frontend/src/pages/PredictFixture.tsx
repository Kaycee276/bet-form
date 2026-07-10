import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pitch } from "../components/predict/Pitch";
import { PlayerRoster } from "../components/predict/PlayerRoster";
import { CustomDropdown } from "../components/ui/CustomDropdown";
import { usePredictionStore } from "../store/usePredictionStore";
import { ArrowLeft } from "lucide-react";

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
    // Reset store on mount
    reset();
    
    fetch(`${API_URL}/api/fixtures/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFixture(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
      
    return () => reset(); // clean up on unmount
  }, [id, reset]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-emerald-300 animate-spin opacity-50 animation-delay-200"></div>
        </div>
      </div>
    );
  }

  if (!fixture) {
    return <div className="min-h-screen bg-bg-base text-white p-12">Fixture not found.</div>;
  }

  // Filter squads based on selected team
  const currentSquad = fixture.squads
    ?.filter((s) => s.teamSide === selectedTeam)
    .map((s) => s.player) || [];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col pb-12">
      <header className="pt-8 pb-6 px-6 max-w-7xl mx-auto w-full border-b border-white/5 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-1">
              Set Your Lineup
            </h2>
            <p className="text-slate-400 text-sm">
              Predict the starting XI and formation for <span className="font-bold text-white">{selectedTeam === "HOME" ? fixture.homeTeamName : fixture.awayTeamName}</span>
            </p>
          </div>
          
          <button disabled className="bg-primary/50 text-bg-base/50 font-bold px-6 py-2 rounded-full cursor-not-allowed whitespace-nowrap w-full md:w-auto text-sm">
            Lock Prediction
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls & Pitch */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Controls Panel */}
          <div className="relative z-20 glass-panel p-4 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-white/5 shadow-lg">
            {/* Team Toggle */}
            <div className="flex bg-black/40 p-1 rounded-full w-full sm:w-auto border border-white/5">
              <button 
                onClick={() => setSelectedTeam("HOME")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedTeam === "HOME" ? 'bg-primary text-bg-base shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {fixture.homeTeamName}
              </button>
              <button 
                onClick={() => setSelectedTeam("AWAY")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedTeam === "AWAY" ? 'bg-primary text-bg-base shadow-lg' : 'text-slate-400 hover:text-white'}`}
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

          {/* The Pitch */}
          <Pitch squad={currentSquad} />
          
        </div>

        {/* Right Column: Roster */}
        <div className="lg:col-span-4 h-[600px] lg:h-auto">
          <PlayerRoster squad={currentSquad} />
        </div>

      </main>
    </div>
  );
};
