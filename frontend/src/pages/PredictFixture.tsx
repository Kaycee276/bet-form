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
      <div className="min-h-screen bg-[#0a0d3a] flex items-center justify-center">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#5865f2] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-[#35ed7e] animate-spin opacity-70"></div>
        </div>
      </div>
    );
  }

  if (!fixture) {
    return <div className="min-h-screen bg-[#0a0d3a] text-white p-12">Fixture not found.</div>;
  }

  const currentSquad = fixture.squads
    ?.filter((s) => s.teamSide === selectedTeam)
    .map((s) => s.player) || [];

  return (
    <div className="min-h-screen bg-[#0a0d3a] flex flex-col pb-16 text-white overflow-hidden relative">
      {/* Discord background glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#5865f2]/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#ec48bd]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="pt-8 pb-6 px-6 max-w-7xl mx-auto w-full border-b border-white/10 mb-6 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#949ba4] hover:text-white mb-6 transition-colors text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Fixtures
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <img 
                src="/logo.png" 
                alt="BetForm Logo" 
                className="w-5 h-5 rounded-md border border-white/20 shadow-[0_0_8px_rgba(88,101,242,0.5)] object-cover" 
              />
              <span className="text-xs font-heading font-black tracking-wider uppercase text-[#35ed7e]">
                Tactical Studio
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
              Lineup & Formation Builder
            </h2>
            <p className="text-[#949ba4] text-xs md:text-sm font-medium">
              Predict starting XI and shape for <span className="font-bold text-white">{selectedTeam === "HOME" ? fixture.homeTeamName : fixture.awayTeamName}</span>
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="discord-button-blurple px-7 py-3 rounded-full cursor-pointer whitespace-nowrap w-full md:w-auto text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(88,101,242,0.5)]"
          >
            <Lock size={15} />
            <span>Lock Prediction</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Controls Panel */}
          <div className="discord-card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Team Toggle Pills */}
            <div className="flex bg-[#12153b] p-1 rounded-full w-full sm:w-auto border border-white/10">
              <button 
                onClick={() => setSelectedTeam("HOME")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-heading font-black transition-all cursor-pointer ${
                  selectedTeam === "HOME" 
                    ? 'bg-[#5865f2] text-white shadow-lg' 
                    : 'text-[#949ba4] hover:text-white'
                }`}
              >
                {fixture.homeTeamName}
              </button>
              <button 
                onClick={() => setSelectedTeam("AWAY")}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-xs font-heading font-black transition-all cursor-pointer ${
                  selectedTeam === "AWAY" 
                    ? 'bg-[#5865f2] text-white shadow-lg' 
                    : 'text-[#949ba4] hover:text-white'
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

      {/* Lock Prediction & Soroban Contest Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 discord-modal-backdrop"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="discord-panel w-full max-w-lg shadow-2xl overflow-hidden relative z-10 border border-white/15 bg-[#181b3d]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-2 font-heading font-black text-xl tracking-tight text-white">
                  <ShieldCheck className="text-[#35ed7e]" size={22} />
                  <span>Lock Tactical Prediction</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full text-[#949ba4] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {txResult ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-[#35ed7e]/20 text-[#35ed7e] border border-[#35ed7e]/40 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(53,237,126,0.4)]">
                      <CheckCircle2 size={36} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-heading font-black text-white mb-2">Prediction Locked!</h3>
                      <p className="text-xs text-[#949ba4] max-w-sm mx-auto leading-relaxed">
                        {contestMode === "USDC_POOL"
                          ? "Your prediction hash and 10 USDC stake have been deposited into the Soroban Smart Contract."
                          : "Your Free-to-Play tactical prediction has been recorded on the leaderboard."}
                      </p>
                    </div>

                    {txResult.txHash && contestMode === "USDC_POOL" && (
                      <div className="p-3 bg-[#101338] border border-[#35ed7e]/30 rounded-xl text-left space-y-1 font-mono text-xs">
                        <p className="text-[#949ba4] font-bold uppercase text-[10px]">Stellar Testnet TX Hash:</p>
                        <p className="text-[#35ed7e] truncate font-semibold">{txResult.txHash}</p>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setTxResult(null);
                      }}
                      className="w-full discord-button-blurple py-3.5 text-sm font-black cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Score Predictor Inputs */}
                    <div className="space-y-2">
                      <label className="text-xs font-heading font-bold text-[#949ba4] uppercase tracking-wider">
                        Predicted Fulltime Scoreline
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-[#101338] border border-white/10 rounded-xl flex items-center justify-between">
                          <span className="text-xs font-heading font-bold text-white truncate max-w-[120px]">{fixture.homeTeamName}</span>
                          <input
                            type="number"
                            min={0}
                            max={15}
                            value={homeScore}
                            onChange={(e) => setHomeScore(parseInt(e.target.value) || 0)}
                            className="w-12 bg-[#23272a] rounded-lg text-center font-heading font-black text-[#35ed7e] p-1 border border-white/20 outline-none"
                          />
                        </div>

                        <div className="p-3 bg-[#101338] border border-white/10 rounded-xl flex items-center justify-between">
                          <span className="text-xs font-heading font-bold text-white truncate max-w-[120px]">{fixture.awayTeamName}</span>
                          <input
                            type="number"
                            min={0}
                            max={15}
                            value={awayScore}
                            onChange={(e) => setAwayScore(parseInt(e.target.value) || 0)}
                            className="w-12 bg-[#23272a] rounded-lg text-center font-heading font-black text-[#35ed7e] p-1 border border-white/20 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-heading font-bold text-[#949ba4] uppercase tracking-wider">
                        Select Entry Mode
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setContestMode("FREE")}
                          className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                            contestMode === "FREE"
                              ? "bg-[#23272a] border-[#5865f2] shadow-lg text-white"
                              : "bg-[#101338] border-white/10 text-[#949ba4] hover:text-white"
                          }`}
                        >
                          <p className="font-heading font-black text-xs uppercase text-white">Free-to-Play</p>
                          <p className="text-[10px] text-[#949ba4] mt-1">Standard leaderboard points</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setContestMode("USDC_POOL")}
                          className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                            contestMode === "USDC_POOL"
                              ? "bg-[#1e2353] border-[#35ed7e] shadow-[0_0_15px_rgba(53,237,126,0.3)] text-white"
                              : "bg-[#101338] border-white/10 text-[#949ba4] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Coins size={14} className="text-[#35ed7e]" />
                            <p className="font-heading font-black text-xs uppercase text-[#35ed7e]">USDC Pool</p>
                          </div>
                          <p className="text-[10px] text-[#949ba4] mt-1">10 USDC stake • On-Chain Prize</p>
                        </button>
                      </div>
                    </div>

                    {/* Wallet Status Banner */}
                    {contestMode === "USDC_POOL" && (
                      <div className="p-4 bg-[#101338] border border-[#35ed7e]/30 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-white font-bold">
                            <Wallet className="text-[#5865f2]" size={16} />
                            <span>Freighter Wallet</span>
                          </div>
                          {isConnected && publicKey ? (
                            <span className="font-mono text-[#35ed7e] text-[10px] font-bold">
                              {publicKey.substring(0, 6)}...{publicKey.substring(publicKey.length - 4)}
                            </span>
                          ) : (
                            <button
                              onClick={connectWallet}
                              className="text-xs font-heading font-black text-[#5865f2] hover:underline cursor-pointer"
                            >
                              Connect
                            </button>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                          <span className="text-[#949ba4]">USDC Balance:</span>
                          <span className="font-heading font-black text-white">{usdcBalance} USDC</span>
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div className="p-3 bg-[#ed4245]/20 border border-[#ed4245]/40 rounded-xl text-[#ed4245] text-xs flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      onClick={handleLockPrediction}
                      disabled={isSubmitting}
                      className="w-full discord-button-blurple py-4 text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(88,101,242,0.5)] cursor-pointer"
                    >
                      {isSubmitting
                        ? "Depositing & Locking Hash..."
                        : contestMode === "USDC_POOL"
                        ? "Stake 10 USDC & Lock Prediction"
                        : "Confirm Free Prediction"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
