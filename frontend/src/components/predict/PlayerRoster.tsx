import { usePredictionStore } from '../../store/usePredictionStore';
import { motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';

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

  const getPosBadgeColor = (pos: string) => {
    switch (pos?.toUpperCase()) {
      case "G":
      case "GK":
      case "GOALKEEPER":
        return "text-[#f59e0b] bg-[#f59e0b]/15 border-[#f59e0b]/30";
      case "D":
      case "DEF":
      case "DEFENDER":
        return "text-[#00b0f4] bg-[#00b0f4]/15 border-[#00b0f4]/30";
      case "M":
      case "MID":
      case "MIDFIELDER":
        return "text-[#5865f2] bg-[#5865f2]/15 border-[#5865f2]/30";
      case "F":
      case "FWD":
      case "ATT":
      case "ATTACKER":
        return "text-[#ec48bd] bg-[#ec48bd]/15 border-[#ec48bd]/30";
      default:
        return "text-[#35ed7e] bg-[#35ed7e]/15 border-[#35ed7e]/30";
    }
  };

  return (
    <div className="discord-card p-6 h-full overflow-y-auto max-h-[620px] shadow-2xl hide-scrollbar relative">
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#5865f2]" />
          <h3 className="text-lg font-heading font-black text-white">Squad Roster</h3>
        </div>
        <span className="text-xs font-bold text-[#35ed7e] bg-[#35ed7e]/15 px-3 py-1 rounded-full border border-[#35ed7e]/30">
          {squad.length - assignedPlayers.length} Available
        </span>
      </div>

      {selectedSlotId ? (
        <div className="border border-[#5865f2]/50 bg-[#5865f2]/20 text-white px-4 py-3 rounded-xl mb-5 text-xs font-bold shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5865f2] animate-pulse" />
          <span>Click a player to assign to highlighted position slot.</span>
        </div>
      ) : (
        <div className="bg-[#181b3d] border border-white/10 text-[#949ba4] px-4 py-3 rounded-xl mb-5 text-xs font-medium">
          Select an empty position on the pitch to start drafting.
        </div>
      )}

      <div className="space-y-2.5">
        {squad.map((player) => {
          const isAssigned = assignedPlayers.some((p) => p.playerId === player.id);
          if (isAssigned) return null;

          return (
            <motion.div
              key={player.id}
              whileHover={selectedSlotId ? { x: 4 } : {}}
              whileTap={selectedSlotId ? { scale: 0.98 } : {}}
              onClick={() => handlePlayerClick(player.id)}
              className={`flex items-center gap-3.5 p-3 rounded-xl transition-all border
                ${selectedSlotId 
                  ? 'bg-[#181b3d] hover:bg-[#202552] border-white/10 hover:border-[#5865f2]/60 cursor-pointer shadow-md' 
                  : 'bg-white/5 opacity-40 grayscale cursor-not-allowed border-transparent'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#23272a] flex items-center justify-center overflow-hidden border border-white/15 shrink-0 shadow-inner">
                {player.photo ? (
                  <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-heading font-black">{player.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-heading font-bold text-sm truncate">{player.name}</h4>
                <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-wider border ${getPosBadgeColor(player.position)}`}>
                  {player.position}
                </span>
              </div>
            </motion.div>
          );
        })}

        {squad.length > 0 && squad.every(p => assignedPlayers.some(ap => ap.playerId === p.id)) && (
          <div className="text-center text-[#35ed7e] py-10 text-sm font-bold flex flex-col items-center gap-2">
            <CheckCircle2 size={32} />
            <span>All 11 positions filled!</span>
          </div>
        )}
      </div>
    </div>
  );
};
