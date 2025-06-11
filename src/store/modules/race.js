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
  saveRoundResults(state, payload) {
    const { results, roundNumber } = payload;
    state.rounds.find((round) => round.roundNumber === roundNumber).result = results || [];
    console.log(state.rounds);
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
  startRace({ commit }) {
    commit('SET_IS_RUNNING', true);
  },
  finishRound({ commit }) {
    commit('SET_IS_RUNNING', false);
    commit('SET_CURRENT_ROUND_NUMBER', 0);
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
