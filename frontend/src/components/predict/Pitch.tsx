import { motion } from "framer-motion";
import { usePredictionStore } from "../../store/usePredictionStore";
import { X, Plus } from "lucide-react";

interface PlayerDetails {
  id: number;
  name: string;
  photo?: string | null;
}

interface PitchProps {
  squad: PlayerDetails[];
}

export const Pitch = ({ squad }: PitchProps) => {
  const {
    selectedTeam,
    homeFormation,
    awayFormation,
    homeAssignedPlayers,
    awayAssignedPlayers,
    selectedSlotId,
    setSelectedSlotId,
    unassignPlayer,
  } = usePredictionStore();

  const formation = selectedTeam === "HOME" ? homeFormation : awayFormation;
  const assignedPlayers =
    selectedTeam === "HOME" ? homeAssignedPlayers : awayAssignedPlayers;

  const lines = formation.split("-").map(Number);
  const allLines = [1, ...lines];

  return (
    <div className="relative w-full aspect-[2/3] max-h-[620px] rounded-3xl overflow-hidden flex flex-col justify-between py-6 md:py-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] border border-white/[0.08] bg-gradient-to-b from-[#091b14] via-[#06140f] to-[#040e0b]">
      {/* Stadium Chalk Lines */}
      <div className="absolute inset-0 border border-white/[0.12] m-4 rounded-2xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-t-0 border-white/[0.12] rounded-b-xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-b-0 border-white/[0.12] rounded-t-xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.12] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-white/[0.12] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full pointer-events-none" />

      {/* Render Rows (Reverse order: GK at bottom, ATT at top) */}
      {[...allLines].reverse().map((count, rowIndex) => {
        const logicalRowIndex = allLines.length - 1 - rowIndex;

        return (
          <div
            key={rowIndex}
            className="flex justify-center items-center gap-3 md:gap-8 w-full z-10 px-4"
          >
            {Array.from({ length: count }).map((_, colIndex) => {
              const slotId = `${logicalRowIndex}-${colIndex}`;
              const assignment = assignedPlayers.find(
                (p) => p.slotId === slotId,
              );
              const player = assignment
                ? squad.find((p) => p.id === assignment.playerId)
                : null;

              const isSelected = selectedSlotId === slotId;

              return (
                <motion.div
                  key={slotId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedSlotId(isSelected ? null : slotId)}
                  className="relative flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 md:w-15 md:h-15 rounded-2xl flex items-center justify-center border transition-all duration-200 backdrop-blur-md shadow-lg
                    ${
                      isSelected
                        ? "border-[#00e599] bg-[#00e599]/25 shadow-[0_0_24px_rgba(0,229,153,0.4)]"
                        : player
                          ? "border-[#00e599]/40 bg-[#0e1613] shadow-md"
                          : "border-white/15 bg-white/[0.04] hover:border-[#00e599]/40 hover:bg-[#00e599]/10"
                    }`}
                  >
                    {player ? (
                      player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <span className="text-white font-mono font-bold text-xs md:text-sm">
                          {player.name.substring(0, 3).toUpperCase()}
                        </span>
                      )
                    ) : (
                      <Plus 
                        size={15} 
                        className={`transition-colors ${isSelected ? "text-[#00e599]" : "text-slate-400 group-hover:text-white"}`} 
                      />
                    )}
                  </div>

                  {/* Player Name Tag */}
                  <div className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] md:text-[11px] font-mono font-medium max-w-[80px] md:max-w-[100px] truncate text-center backdrop-blur-md shadow-md border transition-all ${
                    isSelected
                      ? "bg-[#00e599] text-black border-white/20 font-bold"
                      : player
                        ? "bg-[#0b1411] text-[#00e599] border-[#00e599]/30"
                        : "bg-[#080b0f]/80 text-slate-400 border-white/[0.08]"
                  }`}>
                    {player ? player.name.split(" ").pop() : "Slot"}
                  </div>

                  {/* Unassign button */}
                  {player && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unassignPlayer(slotId);
                      }}
                      className="absolute -top-1 -right-1 bg-rose-500/90 hover:bg-rose-600 text-white font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
