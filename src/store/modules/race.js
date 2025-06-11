import { ROUND_DISTANCES, NUMBER_OF_ROUNDS } from '@/constants/raceAttributes';

const state = () => ({
  rounds: [],
  currentRoundNumber: 0,
});

const getters = {
  getRounds(state) {
    return state.rounds;
  },
  getCurrentRoundDetails(state) {
    return state.rounds.find((round) => round.roundNumber === state.currentRoundNumber) || null;
  },
  getCurrentRoundNumber(state) {
    return state.currentRoundNumber;
  },
};

const mutations = {
  SET_ROUNDS(state, rounds) {
    state.rounds = rounds;
  },
  SET_CURRENT_ROUND_NUMBER(state, currentRoundNumber) {
    state.currentRoundNumber = currentRoundNumber;
  },
  SAVE_ROUND_RESULTS(state, payload) {
    const { results, roundNumber } = payload;
    state.rounds.find((round) => round.roundNumber === roundNumber).result = results || [];
  },
  RESET_RACE(state) {
    state.rounds = [];
    state.currentRoundNumber = 0;
  },
  FINISH_RACE(state) {
    state.currentRoundNumber = 0;
  },
};

const actions = {
  generateSchedule({ commit, rootGetters }) {
    const allHorses = rootGetters['horses/getAllHorses'];
    if (!allHorses || allHorses.length === 0) {
      return;
    }

    const rounds = [];

    for (let i = 1; i <= NUMBER_OF_ROUNDS; i++) {
      const shuffled = [...allHorses].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      rounds.push({
        roundNumber: i,
        distance: ROUND_DISTANCES[i - 1],
        participants: selected,
        result: [],
      });
    }

    commit('SET_ROUNDS', rounds);
    commit('SET_CURRENT_ROUND_NUMBER', 1);
  },
  resetGame({ commit }) {
    commit('RESET_RACE');
  },
  finishGame({ commit }) {
    commit('FINISH_RACE');
  },
  nextRound({ commit, state }) {
    if (state.currentRoundNumber < state.rounds.length) {
      commit('SET_CURRENT_ROUND_NUMBER', state.currentRoundNumber + 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
