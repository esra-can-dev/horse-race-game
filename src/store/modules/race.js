import { ROUND_DISTANCES } from '@/constants/raceAttributes';

const state = () => ({
  rounds: [],
  currentRoundNumber: 0,
  isRunning: false,
});

const getters = {
  getRounds(state) {
    return state.rounds;
  },
  getCurrentRoundDetails(state) {
    return state.rounds.find((round) => round.roundNumber === state.currentRoundNumber);
  },
  getCurrentRoundNumber(state) {
    return state.currentRoundNumber;
  },
};

const mutations = {
  SET_ROUNDS(state, rounds) {
    state.rounds = rounds;
  },
  SET_IS_RUNNING(state, isRunning) {
    state.isRunning = isRunning;
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
    state.isRunning = false;
  },
  FINISH_RACE(state) {
    state.currentRoundNumber = 0;
    state.isRunning = false;
  },
};

const actions = {
  generateSchedule({ commit, rootGetters }) {
    const allHorses = rootGetters['horses/getAllHorses'];
    if (!allHorses || allHorses.length === 0) {
      console.warn('Atlar henüz yüklenmemiş veya mevcut değil.');
      return;
    }

    const rounds = [];

    for (let i = 1; i <= 6; i++) {
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
  startIsRunning({ commit }) {
    commit('SET_IS_RUNNING', true);
  },
  resetGame({ commit }) {
    commit('RESET_RACE');
  },
  finishGame({ commit }) {
    commit('FINISH_RACE');
  },
  nextRound({ commit, state }) {
    commit('SET_CURRENT_ROUND_NUMBER', state.currentRoundNumber + 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
