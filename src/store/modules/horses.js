const state = () => ({
  horses: [],
});

const getters = {
  getAllHorses(state) {
    return state.horses;
  },
  getHorseById: (state) => (id) => {
    return state.horses.find((horse) => horse.id === id);
  },
};

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses;
  },
  UPDATE_HORSE(state, updatedHorse) {
    const index = state.horses.findIndex((h) => h.id === updatedHorse.id);
    if (index !== -1) {
      state.horses.splice(index, 1, updatedHorse);
    }
  },
};

const actions = {
  generateHorses({ commit }) {
    const horses = [];
    const colors = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'pink',
      'cyan',
      'lime',
      'teal',
      'amber',
      'indigo',
      'violet',
      'brown',
      'gray',
      'magenta',
      'gold',
      'silver',
      'navy',
      'coral',
    ];

    for (let i = 1; i <= 20; i++) {
      horses.push({
        id: i,
        name: `Horse ${i}`,
        color: colors[i - 1],
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
