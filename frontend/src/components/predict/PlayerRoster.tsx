import { usePredictionStore } from '../../store/usePredictionStore';
import { motion } from 'framer-motion';

interface PlayerDetails {
  id: number;
  name: string;
  photo?: string | null;
  position: string;
}

interface PlayerRosterProps {
  squad: PlayerDetails[];
}

export const PlayerRoster = ({ squad }: PlayerRosterProps) => {
  const { selectedTeam, homeAssignedPlayers, awayAssignedPlayers, selectedSlotId, assignPlayer } = usePredictionStore();
  const assignedPlayers = selectedTeam === "HOME" ? homeAssignedPlayers : awayAssignedPlayers;

  const handlePlayerClick = (playerId: number) => {
    if (selectedSlotId) {
      assignPlayer(selectedSlotId, playerId);
    }
  };

  return (
    <div className="bg-bg-base border border-white/5 rounded-3xl p-5 h-full overflow-y-auto max-h-[600px] shadow-lg custom-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-heading font-bold text-white">Available Players</h3>
        <span className="text-sm font-medium text-slate-400 bg-white/5 px-3 py-1 rounded-full">
          {squad.length - assignedPlayers.length} left
        </span>
      </div>

      {selectedSlotId ? (
        <div className="bg-primary/20 border border-primary/30 text-primary px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-pulse shadow-inner">
          Select a player below to assign to the highlighted position.
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 text-slate-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
          Click an empty position on the pitch to start assigning players.
        </div>
      )}

      <div className="space-y-3">
        {squad.map((player) => {
          const isAssigned = assignedPlayers.some((p) => p.playerId === player.id);
          if (isAssigned) return null; // Hide assigned players from the roster

          return (
            <motion.div
              key={player.id}
              whileHover={selectedSlotId ? { x: 4 } : {}}
              whileTap={selectedSlotId ? { scale: 0.98 } : {}}
              onClick={() => handlePlayerClick(player.id)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors
                ${selectedSlotId 
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer shadow-sm hover:shadow' 
                  : 'bg-white/5 opacity-50 grayscale cursor-not-allowed border border-transparent'}`}
            >
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/50 text-xs font-bold">{player.name.substring(0,2).toUpperCase()}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm truncate">{player.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 uppercase font-bold tracking-wider">{player.position}</p>
              </div>
            </motion.div>
          );
        })}

        {squad.length > 0 && squad.every(p => assignedPlayers.some(ap => ap.playerId === p.id)) && (
          <div className="text-center text-slate-500 py-10 text-sm font-medium">
            All players assigned!
          </div>
        )}
      </div>
    </div>
  );
};
