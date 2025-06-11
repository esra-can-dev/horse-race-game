import { HORSE_COLORS, HORSE_NAMES, MAX_HORSES } from '@/constants/horseAttributes';

const state = () => ({
  horses: [],
});

const getters = {
  getAllHorses(state) {
    return state.horses;
  },
};

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses;
  },
};

const actions = {
  async generateHorses({ commit }) {
    const horses = [];

    for (let i = 1; i <= MAX_HORSES; i++) {
      horses.push({
        id: i,
        name: HORSE_NAMES[i - 1],
        color: HORSE_COLORS[i - 1],
        condition: Math.floor(Math.random() * 100) + 1,
      });
    }

    commit('SET_HORSES', horses);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
