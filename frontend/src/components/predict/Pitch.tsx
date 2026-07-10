import { motion } from "framer-motion";
import { usePredictionStore } from "../../store/usePredictionStore";
import { User, X } from "lucide-react";

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

  // Parse formation, e.g. "4-3-3" -> [4, 3, 3]
  const lines = formation.split("-").map(Number);
  // Add GK line
  const allLines = [1, ...lines]; // e.g. [1, 4, 3, 3]

  return (
    <div className="relative w-full aspect-[2/3] max-h-[600px] bg-(--color-primary)/50 rounded-3xl border-4 border-white/20 overflow-hidden shadow-2xl flex flex-col justify-between py-6 md:py-10">
      {/* Pitch markings */}
      <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-lg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-2 border-t-0 border-white/30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-2 border-b-0 border-white/30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 border-2 border-white/30 rounded-full pointer-events-none" />

      {/* Render Rows (Reverse order to have GK at the bottom, ATT at the top) */}
      {[...allLines].reverse().map((count, rowIndex) => {
        // Calculate the actual row index from the bottom (GK is 0)
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSlotId(isSelected ? null : slotId)}
                  className={`relative flex flex-col items-center justify-center cursor-pointer group`}
                >
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors
                    ${isSelected ? "border-amber-400 bg-amber-400/30" : player ? "border-white bg-bg-base" : "border-white/40 bg-black/20 hover:border-white/80"}`}
                  >
                    {player ? (
                      player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-white font-bold text-xs">
                          {player.name.substring(0, 3).toUpperCase()}
                        </span>
                      )
                    ) : (
                      <User
                        size={20}
                        className={
                          isSelected ? "text-amber-400" : "text-white/50"
                        }
                      />
                    )}
                  </div>

                  {/* Player Name Tag */}
                  <div className="mt-1.5 bg-bg-base/90 px-2 py-0.5 rounded text-[10px] md:text-xs text-white font-medium max-w-[70px] md:max-w-[90px] truncate text-center shadow">
                    {player ? player.name.split(" ").pop() : "Select"}
                  </div>

                  {/* Unassign button */}
                  {player && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unassignPlayer(slotId);
                      }}
                      className="absolute -top-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <X size={12} />
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
