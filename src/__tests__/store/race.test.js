import { describe, it, expect, beforeEach } from 'vitest';
import raceModule from '@/store/modules/race';
import { ROUND_DISTANCES, NUMBER_OF_ROUNDS } from '@/constants/raceAttributes';

describe('race Vuex module', () => {
  let state, commit, rootGetters;
  const roundsSample = [{ roundNumber: 1, distance: 1000, participants: [], result: [] }];

  beforeEach(() => {
    state = raceModule.state();
    commit = vi.fn((mutation, payload) => {
      raceModule.mutations[mutation](state, payload);
    });
    rootGetters = {
      'horses/getAllHorses': [
        { id: 1, name: 'Horse 1', color: 'red', condition: 50 },
        { id: 2, name: 'Horse 2', color: 'blue', condition: 80 },
      ],
    };
  });

  it('initial state is empty rounds array and currentRoundNumber=0', () => {
    expect(state.rounds).toEqual([]);
    expect(state.currentRoundNumber).toEqual(0);
  });

  it('SET_ROUNDS mutation sets rounds array', () => {
    commit('SET_ROUNDS', roundsSample);
    expect(state.rounds).toEqual(roundsSample);
  });

  it('SET_CURRENT_ROUND_NUMBER mutation sets currentRoundNumber value', () => {
    commit('SET_CURRENT_ROUND_NUMBER', 1);
    expect(state.currentRoundNumber).toEqual(1);
  });

  it('SAVE_ROUND_RESULTS mutation sets specific round result array', () => {
    commit('SET_ROUNDS', roundsSample);

    const resultSample = [{ position: 1, name: 'Horse 1' }];
    const payloadSample = { results: resultSample, roundNumber: 1 };
    commit('SAVE_ROUND_RESULTS', payloadSample);
    expect(state.rounds.find((round) => round.roundNumber === 1).result).toEqual(resultSample);
  });

  it('RESET_RACE mutation reset the state', () => {
    commit('SET_ROUNDS', roundsSample);
    commit('SET_CURRENT_ROUND_NUMBER', 1);

    commit('RESET_RACE');

    expect(state.rounds).toEqual([]);
    expect(state.currentRoundNumber).toEqual(0);
  });

  it('FINISH_RACE mutation reset the currentRoundNumber', () => {
    commit('SET_CURRENT_ROUND_NUMBER', 5);
    commit('FINISH_RACE');
    expect(state.currentRoundNumber).toEqual(0);
  });

  it('getRounds getter returns all rounds', async () => {
    commit('SET_ROUNDS', roundsSample);

    const result = raceModule.getters.getRounds(state);
    expect(result).toEqual(roundsSample);
  });

  it('getCurrentRoundDetails getter returns current round details', async () => {
    const roundsSample = [
      { roundNumber: 1, distance: 1000, participants: [], result: [] },
      { roundNumber: 2, distance: 1300, participants: [], result: [] },
    ];
    commit('SET_ROUNDS', roundsSample);
    commit('SET_CURRENT_ROUND_NUMBER', 2);

    const result = raceModule.getters.getCurrentRoundDetails(state);
    expect(result).toEqual(roundsSample[1]);
  });

  it('getCurrentRoundNumber getter returns all currentRoundNumber', async () => {
    commit('SET_CURRENT_ROUND_NUMBER', 5);

    const result = raceModule.getters.getCurrentRoundNumber(state);
    expect(result).toEqual(5);
  });

  it('generateSchedule commits rounds and sets current round number', () => {
    raceModule.actions.generateSchedule({ commit, rootGetters });

    expect(commit).toHaveBeenCalledWith('SET_ROUNDS', expect.any(Array));
    expect(commit).toHaveBeenCalledWith('SET_CURRENT_ROUND_NUMBER', 1);

    const roundsArg = commit.mock.calls.find((call) => call[0] === 'SET_ROUNDS')[1];
    expect(roundsArg.length).toBe(NUMBER_OF_ROUNDS);
  });

  it('resetGame commits calls RESET_RACE mutations', () => {
    raceModule.actions.resetGame({ commit });
    expect(commit).toHaveBeenCalled('RESET_RACE');
  });

  it('finishGame commits calls FINISH_RACE mutations', () => {
    raceModule.actions.finishGame({ commit });
    expect(commit).toHaveBeenCalled('FINISH_RACE');
  });

  it('nextRound commits calls FINISH_RACE mutations', () => {
    const roundsSample = [
      { roundNumber: 1, distance: 1000, participants: [], result: [] },
      { roundNumber: 2, distance: 1300, participants: [], result: [] },
    ];
    commit('SET_ROUNDS', roundsSample);
    commit('SET_CURRENT_ROUND_NUMBER', 1);

    raceModule.actions.nextRound({ commit, state });
    expect(commit).toHaveBeenCalledWith('SET_CURRENT_ROUND_NUMBER', 2);
  });
});
