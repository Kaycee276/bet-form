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
    <div className="relative w-full aspect-[2/3] max-h-[620px] discord-pitch rounded-3xl overflow-hidden flex flex-col justify-between py-6 md:py-10 shadow-2xl border border-[#5865f2]/30">
      {/* Tactical pitch lines with Discord neon glow */}
      <div className="absolute inset-0 border border-white/10 m-4 rounded-2xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-t-0 border-white/10 rounded-b-xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-b-0 border-white/10 rounded-t-xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-white/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full pointer-events-none" />

      {/* Render Rows (Reverse order to have GK at the bottom, ATT at the top) */}
      {[...allLines].reverse().map((count, rowIndex) => {
        const logicalRowIndex = allLines.length - 1 - rowIndex;

        return (
          <div
            key={rowIndex}
            className="flex justify-center items-center gap-2 md:gap-8 w-full z-10 px-4"
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
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSlotId(isSelected ? null : slotId)}
                  className="relative flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 backdrop-blur-md shadow-xl
                    ${
                      isSelected
                        ? "border-[#5865f2] bg-[#5865f2]/40 shadow-[0_0_28px_rgba(88,101,242,0.8)]"
                        : player
                          ? "border-[#35ed7e] bg-[#1e2353]/95 shadow-[0_0_18px_rgba(53,237,126,0.35)]"
                          : "border-white/20 bg-[#12153b]/80 hover:border-[#5865f2]/60 hover:bg-[#181b3d]"
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
                        <span className="text-white font-heading font-black text-xs md:text-sm">
                          {player.name.substring(0, 3).toUpperCase()}
                        </span>
                      )
                    ) : (
                      <Plus size={16} className={`transition-colors ${isSelected ? "text-white" : "text-[#949ba4] group-hover:text-white"}`} />
                    )}
                  </div>

                  {/* Player Name Tag */}
                  <div className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-heading font-extrabold max-w-[80px] md:max-w-[100px] truncate text-center backdrop-blur-md shadow-lg border transition-all ${
                    isSelected
                      ? "bg-[#5865f2] text-white border-white/30 shadow-[0_0_12px_rgba(88,101,242,0.6)]"
                      : player
                        ? "bg-[#1e2353] text-[#35ed7e] border-[#35ed7e]/40"
                        : "bg-[#101338]/90 text-[#949ba4] border-white/10"
                  }`}>
                    {player ? player.name.split(" ").pop() : "Pick"}
                  </div>

                  {/* Unassign button */}
                  {player && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unassignPlayer(slotId);
                      }}
                      className="absolute -top-1 -right-1 bg-[#ed4245] hover:bg-[#da373c] text-white font-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
