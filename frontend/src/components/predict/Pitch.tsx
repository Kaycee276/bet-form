import { motion } from "framer-motion";
import { usePredictionStore } from "../../store/usePredictionStore";

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
    <div className="relative w-full aspect-[2/3] max-h-[620px] glass-pitch rounded-none overflow-hidden flex flex-col justify-between py-6 md:py-10 shadow-2xl border border-emerald-400/40">
      {/* Tactical pitch lines with bright neon glass effect */}
      <div className="absolute inset-0 border border-emerald-400/40 m-4 rounded-none pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-t-0 border-emerald-400/40 rounded-none pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border border-b-0 border-emerald-400/40 rounded-none pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-400/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border border-emerald-400/40 rounded-none pointer-events-none" />

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
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-none flex items-center justify-center border-2 transition-all duration-200 backdrop-blur-md shadow-xl
                    ${
                      isSelected
                        ? "border-amber-300 bg-amber-400/40 shadow-[0_0_30px_rgba(251,191,36,0.8)]"
                        : player
                          ? "border-emerald-300 bg-slate-800/90 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                          : "border-white/40 bg-slate-900/60 hover:border-emerald-300 hover:bg-slate-800/80"
                    }`}
                  >
                    {player ? (
                      player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover rounded-none"
                        />
                      ) : (
                        <span className="text-white font-heading font-black text-xs">
                          {player.name.substring(0, 3).toUpperCase()}
                        </span>
                      )
                    ) : (
                      <span className={`text-xs font-black ${isSelected ? "text-amber-200" : "text-slate-300"}`}>
                        +
                      </span>
                    )}
                  </div>

                  {/* Player Name Tag */}
                  <div className={`mt-1.5 px-2.5 py-0.5 rounded-none text-[10px] md:text-xs font-heading font-black max-w-[75px] md:max-w-[95px] truncate text-center backdrop-blur-md shadow-lg border ${
                    isSelected
                      ? "bg-amber-500/30 text-amber-200 border-amber-300/50"
                      : player
                        ? "bg-slate-800/95 text-emerald-300 border-emerald-400/50"
                        : "bg-slate-900/80 text-slate-200 border-white/20"
                  }`}>
                    {player ? player.name.split(" ").pop() : "Select"}
                  </div>

                  {/* Unassign button */}
                  {player && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unassignPlayer(slotId);
                      }}
                      className="absolute -top-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-none w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      ✕
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
