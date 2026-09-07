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
    <div className="glass-card rounded-3xl p-6 h-full overflow-y-auto max-h-[620px] shadow-2xl hide-scrollbar relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-heading font-extrabold text-white">Available Roster</h3>
        <span className="text-xs font-bold text-emerald-400 glass-pill px-3 py-1 rounded-full border border-emerald-500/30">
          {squad.length - assignedPlayers.length} Left
        </span>
      </div>

      {selectedSlotId ? (
        <div className="glass-pill border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 px-4 py-3 rounded-2xl mb-6 text-xs font-bold animate-pulse shadow-md">
          ✨ Select a player below to assign to the highlighted slot.
        </div>
      ) : (
        <div className="glass-card bg-slate-900/40 border border-white/10 text-slate-400 px-4 py-3 rounded-2xl mb-6 text-xs font-medium">
          Click an empty position on the pitch to start drafting.
        </div>
      )}

      <div className="space-y-3">
        {squad.map((player) => {
          const isAssigned = assignedPlayers.some((p) => p.playerId === player.id);
          if (isAssigned) return null;

          return (
            <motion.div
              key={player.id}
              whileHover={selectedSlotId ? { x: 4 } : {}}
              whileTap={selectedSlotId ? { scale: 0.98 } : {}}
              onClick={() => handlePlayerClick(player.id)}
              className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all border
                ${selectedSlotId 
                  ? 'glass-card bg-slate-950/60 hover:bg-slate-900/90 border-white/10 hover:border-emerald-500/40 cursor-pointer shadow-md' 
                  : 'bg-slate-950/30 opacity-50 grayscale cursor-not-allowed border-transparent'}`}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden border border-white/15 shrink-0 shadow-inner">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/60 text-xs font-heading font-bold">{player.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-heading font-bold text-sm truncate">{player.name}</h4>
                <span className="inline-block mt-0.5 text-[10px] text-emerald-400 uppercase font-black tracking-widest">
                  {player.position}
                </span>
              </div>
            </motion.div>
          );
        })}

        {squad.length > 0 && squad.every(p => assignedPlayers.some(ap => ap.playerId === p.id)) && (
          <div className="text-center text-slate-400 py-12 text-sm font-medium">
            🎉 All squad positions assigned!
          </div>
        )}
      </div>
    </div>
  );
};
