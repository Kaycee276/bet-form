import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pitch } from "../components/predict/Pitch";
import { PlayerRoster } from "../components/predict/PlayerRoster";
import { CustomDropdown } from "../components/ui/CustomDropdown";
import { usePredictionStore } from "../store/usePredictionStore";
import { useStellarWallet } from "../context/StellarWalletContext";
import { generatePredictionHash, enterContestOnChain } from "../services/sorobanContract";
import { ArrowLeft, Lock, ShieldCheck, Wallet, CheckCircle2, AlertCircle, X, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  
  // Prediction modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contestMode, setContestMode] = useState<"FREE" | "USDC_POOL">("USDC_POOL");
  const [homeScore, setHomeScore] = useState<number>(2);
  const [awayScore, setAwayScore] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txResult, setTxResult] = useState<{ success: boolean; txHash: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { isConnected, publicKey, connectWallet, usdcBalance } = useStellarWallet();
  const { selectedTeam, setSelectedTeam, homeFormation, awayFormation, homeAssignedPlayers, awayAssignedPlayers, setFormation, reset } = usePredictionStore();
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

  const handleLockPrediction = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const assigned = selectedTeam === "HOME" ? homeAssignedPlayers : awayAssignedPlayers;
      const playerIds = assigned.map((a) => a.playerId.toString());
      const hash = await generatePredictionHash(id || "1", homeScore, awayScore, playerIds);

      if (contestMode === "USDC_POOL") {
        const userAddr = publicKey || "GDFK738...DEMO";
        const result = await enterContestOnChain(userAddr, `CONTEST-${id}`, hash, 10);
        setTxResult(result);
      } else {
        setTxResult({
          success: true,
          txHash: "FREE_ENTRY_LOCKED",
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit prediction.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-[#00e599] animate-spin" />
        </div>
      </div>
    );
  }

  if (!fixture) {
    return <div className="min-h-screen bg-[#08090d] text-slate-300 p-12">Fixture not found.</div>;
  }

  const currentSquad = fixture.squads
    ?.filter((s) => s.teamSide === selectedTeam)
    .map((s) => s.player) || [];

  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col pb-16 text-slate-100 overflow-hidden relative">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-[#00e599]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-slate-800/15 rounded-full blur-[160px] pointer-events-none" />

      <header className="pt-8 pb-6 px-6 max-w-7xl mx-auto w-full border-b border-white/[0.07] mb-6 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit cursor-pointer"
        >
          <ArrowLeft size={13} /> Back to Fixtures
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <img 
                src="/logo.png" 
                alt="BetForm Logo" 
                className="w-5 h-5 rounded-md border border-white/10 object-cover" 
              />
              <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#00e599] font-medium">
                Tactical Studio
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-1">
              Lineup & Formation Builder
            </h2>
            <p className="text-slate-400 text-xs md:text-sm font-normal">
              Predict starting XI and tactical shape for <span className="font-semibold text-white">{selectedTeam === "HOME" ? fixture.homeTeamName : fixture.awayTeamName}</span>
            </p>
          </div>
          
          {/* Button-in-Button Lock CTA */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="pl-5 pr-2 py-2 rounded-full bg-[#00e599] text-[#04120b] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_8px_24px_-4px_rgba(0,229,153,0.35)] hover:bg-[#05f0a2] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Lock Prediction</span>
            <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center">
              <Lock size={13} className="text-[#04120b]" />
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Controls Double-Bezel Panel */}
          <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="p-3 rounded-[calc(1rem-2px)] bg-[#0f121a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Team Toggle Pills */}
              <div className="flex bg-[#141824] p-1 rounded-full w-full sm:w-auto border border-white/[0.08]">
                <button 
                  onClick={() => setSelectedTeam("HOME")}
                  className={`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedTeam === "HOME" 
                      ? 'bg-white text-[#08090d] shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fixture.homeTeamName}
                </button>
                <button 
                  onClick={() => setSelectedTeam("AWAY")}
                  className={`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedTeam === "AWAY" 
                      ? 'bg-white text-[#08090d] shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fixture.awayTeamName}
                </button>
              </div>

              {/* Formation Selector */}
              <CustomDropdown
                label="Tactical Shape"
                value={formation}
                options={formations}
                onChange={setFormation}
              />
            </div>
          </div>

          {/* Tactical Pitch */}
          <Pitch squad={currentSquad} />
        </div>

        <div className="lg:col-span-4 h-[620px] lg:h-auto">
          <PlayerRoster squad={currentSquad} />
        </div>
      </main>

      {/* Lock Prediction & Soroban Contest Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="p-1 rounded-[2rem] bg-white/[0.04] border border-white/10 w-full max-w-lg shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] relative z-10"
            >
              <div className="p-6 md:p-8 rounded-[calc(2rem-4px)] bg-[#0e1118]">
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2 font-heading font-black text-lg tracking-tight text-white">
                    <ShieldCheck className="text-[#00e599]" size={20} />
                    <span>Lock Tactical Prediction</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={17} />
                  </button>
                </div>

                {txResult ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30 rounded-full mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(0,229,153,0.3)]">
                      <CheckCircle2 size={32} />
                    </div>

                    <div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2">Prediction Locked!</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        {contestMode === "USDC_POOL"
                          ? "Your prediction hash and 10 USDC stake have been deposited into the Soroban Smart Contract."
                          : "Your Free-to-Play tactical prediction has been recorded on the leaderboard."}
                      </p>
                    </div>

                    {txResult.txHash && contestMode === "USDC_POOL" && (
                      <div className="p-3 bg-[#131722] border border-[#00e599]/30 rounded-xl text-left space-y-1 font-mono text-xs">
                        <p className="text-slate-400 font-bold uppercase text-[10px]">Stellar Testnet TX Hash:</p>
                        <p className="text-[#00e599] truncate font-semibold">{txResult.txHash}</p>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setTxResult(null);
                      }}
                      className="w-full py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score Predictor Inputs */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Predicted Fulltime Scoreline
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-[#131722] border border-white/[0.08] rounded-xl flex items-center justify-between">
                          <span className="text-xs font-medium text-white truncate max-w-[120px]">{fixture.homeTeamName}</span>
                          <input
                            type="number"
                            min={0}
                            max={15}
                            value={homeScore}
                            onChange={(e) => setHomeScore(parseInt(e.target.value) || 0)}
                            className="w-11 bg-[#1a202e] rounded-lg text-center font-mono font-bold text-[#00e599] p-1 border border-white/10 outline-none tabular-nums"
                          />
                        </div>

                        <div className="p-3 bg-[#131722] border border-white/[0.08] rounded-xl flex items-center justify-between">
                          <span className="text-xs font-medium text-white truncate max-w-[120px]">{fixture.awayTeamName}</span>
                          <input
                            type="number"
                            min={0}
                            max={15}
                            value={awayScore}
                            onChange={(e) => setAwayScore(parseInt(e.target.value) || 0)}
                            className="w-11 bg-[#1a202e] rounded-lg text-center font-mono font-bold text-[#00e599] p-1 border border-white/10 outline-none tabular-nums"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Select Entry Mode
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setContestMode("FREE")}
                          className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                            contestMode === "FREE"
                              ? "bg-white/[0.08] border-white/20 text-white"
                              : "bg-[#131722] border-white/[0.06] text-slate-400 hover:text-white"
                          }`}
                        >
                          <p className="font-mono font-bold text-xs uppercase text-white">Free-to-Play</p>
                          <p className="text-[10px] text-slate-400 mt-1">Standard leaderboard points</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContestMode("USDC_POOL")}
                          className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                            contestMode === "USDC_POOL"
                              ? "bg-[#00e599]/10 border-[#00e599]/40 text-white shadow-sm"
                              : "bg-[#131722] border-white/[0.06] text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Coins size={13} className="text-[#00e599]" />
                            <p className="font-mono font-bold text-xs uppercase text-[#00e599]">USDC Pool</p>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">10 USDC stake • On-Chain Prize</p>
                        </button>
                      </div>
                    </div>

                    {/* Wallet Status Banner */}
                    {contestMode === "USDC_POOL" && (
                      <div className="p-3.5 bg-[#131722] border border-white/[0.08] rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-white font-medium">
                            <Wallet className="text-[#00e599]" size={15} />
                            <span>Freighter Wallet</span>
                          </div>
                          {isConnected && publicKey ? (
                            <span className="font-mono text-[#00e599] text-[10px] font-semibold">
                              {publicKey.substring(0, 6)}...{publicKey.substring(publicKey.length - 4)}
                            </span>
                          ) : (
                            <button
                              onClick={connectWallet}
                              className="text-xs font-mono font-bold text-[#00e599] hover:underline cursor-pointer"
                            >
                              Connect
                            </button>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06]">
                          <span className="text-slate-400">USDC Balance:</span>
                          <span className="font-mono font-bold text-white tabular-nums">{usdcBalance} USDC</span>
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                        <AlertCircle size={15} className="shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      onClick={handleLockPrediction}
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#00e599] hover:bg-[#05f0a2] text-black font-bold text-xs uppercase tracking-wider shadow-[0_8px_24px_-4px_rgba(0,229,153,0.35)] cursor-pointer active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Depositing & Locking Hash..."
                        : contestMode === "USDC_POOL"
                        ? "Stake 10 USDC & Lock Prediction"
                        : "Confirm Free Prediction"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
