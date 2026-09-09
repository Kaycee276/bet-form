import { describe, it, expect, beforeEach } from "vitest";
import { usePredictionStore } from "./usePredictionStore";

describe("usePredictionStore", () => {
  beforeEach(() => {
    usePredictionStore.getState().reset();
  });

  it("should initialize with default HOME team and 4-3-3 formation", () => {
    const state = usePredictionStore.getState();
    expect(state.selectedTeam).toBe("HOME");
    expect(state.homeFormation).toBe("4-3-3");
    expect(state.awayFormation).toBe("4-3-3");
    expect(state.homeAssignedPlayers).toEqual([]);
    expect(state.awayAssignedPlayers).toEqual([]);
  });

  it("should switch selected team", () => {
    usePredictionStore.getState().setSelectedTeam("AWAY");
    expect(usePredictionStore.getState().selectedTeam).toBe("AWAY");
  });

  it("should change formation and clear assigned players for selected team", () => {
    usePredictionStore.getState().assignPlayer("GK", 1);
    expect(usePredictionStore.getState().homeAssignedPlayers).toHaveLength(1);

    usePredictionStore.getState().setFormation("4-2-3-1");
    expect(usePredictionStore.getState().homeFormation).toBe("4-2-3-1");
    expect(usePredictionStore.getState().homeAssignedPlayers).toEqual([]);
  });

  it("should assign and unassign players correctly", () => {
    usePredictionStore.getState().assignPlayer("GK", 1);
    usePredictionStore.getState().assignPlayer("ST", 9);
    
    let players = usePredictionStore.getState().homeAssignedPlayers;
    expect(players).toHaveLength(2);

    usePredictionStore.getState().unassignPlayer("GK");
    players = usePredictionStore.getState().homeAssignedPlayers;
    expect(players).toHaveLength(1);
    expect(players[0].slotId).toBe("ST");
  });
});
