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
    <div className="p-1 rounded-[1.75rem] bg-white/[0.03] border border-white/[0.08] h-full shadow-2xl">
      <div className="h-full p-5 rounded-[calc(1.75rem-4px)] bg-[#0f121a] flex flex-col overflow-y-auto max-h-[620px] hide-scrollbar">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#00e599]" />
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Squad Roster</h3>
          </div>
          <span className="text-xs font-mono font-medium text-[#00e599] bg-[#00e599]/10 px-2.5 py-0.5 rounded-full border border-[#00e599]/25">
            {squad.length - assignedPlayers.length} Available
          </span>
        </div>

        {selectedSlotId ? (
          <div className="border border-[#00e599]/30 bg-[#00e599]/10 text-white px-3.5 py-2.5 rounded-xl mb-4 text-xs font-medium shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />
            <span>Select player to slot into highlighted position.</span>
          </div>
        ) : (
          <div className="bg-white/[0.03] border border-white/[0.06] text-slate-400 px-3.5 py-2.5 rounded-xl mb-4 text-xs font-normal">
            Click any open position on the pitch to slot players.
          </div>
        )}

        <div className="space-y-2 flex-1">
          {squad.map((player) => {
            const isAssigned = assignedPlayers.some((p) => p.playerId === player.id);
            if (isAssigned) return null;

            return (
              <motion.div
                key={player.id}
                whileHover={selectedSlotId ? { x: 3 } : {}}
                whileTap={selectedSlotId ? { scale: 0.98 } : {}}
                onClick={() => handlePlayerClick(player.id)}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all border
                  ${selectedSlotId 
                    ? 'bg-[#131722] hover:bg-[#181d2a] border-white/[0.08] hover:border-[#00e599]/40 cursor-pointer shadow-sm' 
                    : 'bg-white/[0.02] opacity-40 grayscale cursor-not-allowed border-transparent'}`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#181c28] flex items-center justify-center overflow-hidden border border-white/10 shrink-0 shadow-inner">
                  {player.photo ? (
                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xs font-mono font-bold">{player.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-heading font-medium text-xs truncate">{player.name}</h4>
                  <span className={`inline-block mt-0.5 text-[9px] font-mono px-2 py-0.2 rounded-full uppercase font-semibold tracking-wider border ${getPosBadgeColor(player.position)}`}>
                    {player.position}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {squad.length > 0 && squad.every(p => assignedPlayers.some(ap => ap.playerId === p.id)) && (
            <div className="text-center text-[#00e599] py-10 text-xs font-mono font-bold flex flex-col items-center gap-2">
              <CheckCircle2 size={28} />
              <span>Starting XI Complete!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
