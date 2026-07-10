import { create } from 'zustand';

export interface AssignedPlayer {
  slotId: string;
  playerId: number;
}

interface PredictionState {
  selectedTeam: "HOME" | "AWAY";
  homeFormation: string;
  awayFormation: string;
  homeAssignedPlayers: AssignedPlayer[];
  awayAssignedPlayers: AssignedPlayer[];
  selectedSlotId: string | null;
  
  setSelectedTeam: (team: "HOME" | "AWAY") => void;
  setFormation: (formation: string) => void;
  assignPlayer: (slotId: string, playerId: number) => void;
  unassignPlayer: (slotId: string) => void;
  setSelectedSlotId: (slotId: string | null) => void;
  reset: () => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
  selectedTeam: "HOME",
  homeFormation: "4-3-3",
  awayFormation: "4-3-3",
  homeAssignedPlayers: [],
  awayAssignedPlayers: [],
  selectedSlotId: null,

  setSelectedTeam: (team) => set({ selectedTeam: team, selectedSlotId: null }),
  
  setFormation: (formation) => 
    set((state) => {
      if (state.selectedTeam === "HOME") {
        return { homeFormation: formation, homeAssignedPlayers: [], selectedSlotId: null };
      } else {
        return { awayFormation: formation, awayAssignedPlayers: [], selectedSlotId: null };
      }
    }),
  
  assignPlayer: (slotId, playerId) =>
    set((state) => {
      const isHome = state.selectedTeam === "HOME";
      const players = isHome ? state.homeAssignedPlayers : state.awayAssignedPlayers;
      
      const filtered = players.filter(
        (p) => p.playerId !== playerId && p.slotId !== slotId
      );
      
      if (isHome) {
        return { homeAssignedPlayers: [...filtered, { slotId, playerId }], selectedSlotId: null };
      } else {
        return { awayAssignedPlayers: [...filtered, { slotId, playerId }], selectedSlotId: null };
      }
    }),
    
  unassignPlayer: (slotId) =>
    set((state) => {
      if (state.selectedTeam === "HOME") {
        return { homeAssignedPlayers: state.homeAssignedPlayers.filter((p) => p.slotId !== slotId) };
      } else {
        return { awayAssignedPlayers: state.awayAssignedPlayers.filter((p) => p.slotId !== slotId) };
      }
    }),
    
  setSelectedSlotId: (slotId) => set({ selectedSlotId: slotId }),
  
  reset: () => set({ 
    selectedTeam: "HOME", 
    homeFormation: "4-3-3", 
    awayFormation: "4-3-3", 
    homeAssignedPlayers: [], 
    awayAssignedPlayers: [], 
    selectedSlotId: null 
  }),
}));
